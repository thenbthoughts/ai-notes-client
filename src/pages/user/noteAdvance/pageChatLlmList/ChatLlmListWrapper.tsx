import { useEffect, useState } from 'react';

import {
    ComponentChatHistoryModelRender,
    ComponentChatHistoryRender
} from './sectionLeft/ComponentChatHistory.tsx';
import useResponsiveScreen, {
    screenList
} from '../../../../hooks/useResponsiveScreen.tsx';
import ComponentRightChatWrapper from './sectionRightChat/ComponentRightWrapper.tsx';

import ChatRightFilterWrapper from './sectionRightFilter/ChatRightFilterWrapper.tsx';
import { jotaiChatLlmThreadSetting } from './jotai/jotaiChatLlmThreadSetting.ts';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

const ChatLlmListWrapper = () => {

    // useState
    const location = useLocation();
    const screenWidth = useResponsiveScreen();

    const [
        chatLlmThreadSetting,
        setChatLlmThreadSetting,
    ] = useAtom(jotaiChatLlmThreadSetting);

    const [
        stateDisplayChatHistory,
        setStateDisplayChatHistory,
    ] = useState(false);
    const [
        stateDisplayAdd,
        // setStateDisplayAdd,
    ] = useState(true);

    const [
        refreshRandomNum,
        // setRefreshRandomNum
    ] = useState(0);

    useEffect(() => {
        console.log('location trigger: ', location);
        const queryParams = new URLSearchParams(location.search);
        let tempThreadId = '';
        const chatId = queryParams.get('id') || '';
        if (chatId) {
            tempThreadId = chatId;
        }
        setChatLlmThreadSetting({
            isOpen: chatLlmThreadSetting.isOpen,
            threadId: tempThreadId,
        });
    }, [location]);

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div
                style={{
                    width: 'calc(100vw - 50px)'
                }}
            >
                <div className='container mx-auto px-1'>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        {screenWidth === screenList.lg && (
                            <div
                                style={{
                                    width: '25%'
                                }}
                            >
                                <ComponentChatHistoryRender />
                            </div>
                        )}
                        <div
                            style={{
                                width: screenWidth === screenList.lg ? '75%' : '100%'
                            }}
                        >
                            <div style={{
                                maxWidth: '1000px',
                                margin: '0 auto',
                            }}>
                                <div
                                    style={{
                                        height: 'calc(100vh - 60px)',
                                    }}
                                >
                                    <ComponentRightChatWrapper
                                        stateDisplayAdd={stateDisplayAdd}
                                        refreshRandomNumParent={refreshRandomNum}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* part 3 -> 50px */}
            <div
                style={{
                    width: '50px',
                }}
                className='text-center flex flex-col items-center justify-center'
            >
                <ChatRightFilterWrapper
                    stateDisplayChatHistory={stateDisplayChatHistory}
                    setStateDisplayChatHistory={setStateDisplayChatHistory}
                />
            </div>

            {/* screen list */}
            {screenWidth === screenList.sm && (
                <div>
                    {stateDisplayChatHistory && (
                        <ComponentChatHistoryModelRender />
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatLlmListWrapper;