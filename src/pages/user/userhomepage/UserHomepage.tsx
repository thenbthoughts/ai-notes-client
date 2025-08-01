import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import {
    LucideInfo,
    LucideList,
    LucideMessageSquare,
    LucideSettings,
    LucideLogIn,
    LucideUserPlus,
    LucideLogOut,
    LucideLoader,
    LucideCalendar1,
    LucideFileText
} from 'lucide-react'; // Importing lucide icons
import { useAtomValue } from 'jotai';
import { Fragment, useEffect, useState } from 'react';
import axiosCustom from '../../../config/axiosCustom';

import useResponsiveScreen from '../../../hooks/useResponsiveScreen';
import stateJotaiAuthAtom from '../../../jotai/stateJotaiAuth'; // Adjust the import path as necessary
import iconGit from './iconGit.svg';

import ComponentFromBrithdayToToday from './ComponentFromBrithdayToToday';
import ComponentPinnedTask from './ComponentPinnedTask';
import ComponentCurrentDateTime from './ComponentCurrentDateTime';

const UserHomepage = () => {
    const authState = useAtomValue(stateJotaiAuthAtom);
    const screenSize = useResponsiveScreen();

    const [name, setName] = useState('');

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        try {
            const response = await axiosCustom.post(
                `/api/user/crud/getUser`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
            );
            const fetchedName = response.data.name;
            if (typeof fetchedName === 'string') {
                setName(fetchedName);
            } else {
                console.error("Fetched name is not a string:", fetchedName);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <div>
            <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '20px', paddingBottom: '20px' }}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    <h1 className="text-2xl font-bold text-white mb-2">Hello {name}</h1>
                </div>
                <div style={{ display: 'flex' }} className={`${screenSize === 'sm' ? 'flex-col' : 'flex-row'}`}>
                    {/* left */}
                    <div
                        style={{
                            width: `${screenSize === 'sm' ? '100%' : '40%'}`,
                            paddingLeft: `${screenSize === 'sm' ? '10px' : '20px'}`,
                            paddingRight: `${screenSize === 'sm' ? '10px' : '20px'}`,
                        }}
                    >
                        {authState.isLoggedIn === 'true' && (
                            <Fragment>
                                <div className="pb-2">
                                    <ComponentCurrentDateTime />
                                    <ComponentFromBrithdayToToday />
                                    <ComponentPinnedTask />
                                </div>
                            </Fragment>
                        )}
                        {authState.isLoggedIn === 'false' && (
                            <Fragment>
                                <div className="pb-2">
                                    {/* login */}
                                    <Link to="/login">
                                        <div
                                            className="text-left p-3 border border-blue-400 rounded-md shadow-md bg-gradient-to-r from-blue-100 to-blue-300 mb-2 hover:bg-blue-200 transition duration-300"
                                        >
                                            <div className="flex justify-between items-center ">
                                                <h2 className="text-lg font-bold text-blue-800 cursor-pointer">
                                                    <LucideLogIn size={20} className="inline mr-1" style={{ position: 'relative', top: '-2px' }} />
                                                    Login
                                                </h2>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* register */}
                                    <Link to="/register">
                                        <div
                                            className="text-left p-3 border border-blue-400 rounded-md shadow-md bg-gradient-to-r from-blue-100 to-blue-300 mb-2 hover:bg-blue-200 transition duration-300"
                                        >
                                            <div className="flex justify-between items-center ">
                                                <h2 className="text-lg font-bold text-blue-800 cursor-pointer">
                                                    <LucideUserPlus size={20} className="inline mr-1" style={{ position: 'relative', top: '-2px' }} />
                                                    Register
                                                </h2>
                                            </div>
                                        </div>
                                    </Link>

                                    <ComponentCurrentDateTime />
                                </div>
                            </Fragment>
                        )}
                    </div>
                    {/* right */}
                    <div
                        style={{
                            width: `${screenSize === 'sm' ? '100%' : '60%'}`,
                            paddingLeft: `${screenSize === 'sm' ? '10px' : '20px'}`,
                            paddingRight: `${screenSize === 'sm' ? '10px' : '20px'}`,
                        }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '20px',
                                textAlign: 'center',
                            }}
                        >
                            {authState.isLoggedIn === 'pending' && (
                                <Link to="/" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <LucideLoader size={32} />
                                    </div>
                                    <div>Loading...</div>
                                </Link>
                            )}
                            {authState.isLoggedIn === 'true' && (
                                <>
                                    <Link to="/user/chat" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideMessageSquare size={32} />
                                        </div>
                                        <div>Chat</div>
                                    </Link>
                                    <Link to="/user/task" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideList size={32} />
                                        </div>
                                        <div>Task</div>
                                    </Link>
                                    <Link to="/user/notes" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideFileText size={32} />
                                        </div>
                                        <div>Notes</div>
                                    </Link>
                                    <Link to="/user/life-events" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideCalendar1 size={32} />
                                        </div>
                                        <div>Life Events</div>
                                    </Link>
                                    <Link to="/user/info-vault" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideInfo size={32} />
                                        </div>
                                        <div>Info Vault</div>
                                    </Link>
                                    <Link to="/user/setting" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideSettings size={32} />
                                        </div>
                                        <div>Settings</div>
                                    </Link>
                                    <Link to="/logout" className='block p-3 border bg-red-400 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideLogOut size={32} />
                                        </div>
                                        <div>Logout</div>
                                    </Link>
                                </>
                            )}

                            {authState.isLoggedIn === 'false' && (
                                <>
                                    <Link to="/login" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideLogIn size={32} />
                                        </div>
                                        <div>Login</div>
                                    </Link>
                                    <Link to="/register" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <LucideUserPlus size={32} />
                                        </div>
                                        <div>Register</div>
                                    </Link>
                                </>
                            )}
                            <Link to="/about" className='block p-3 border bg-cyan-100 rounded hover:shadow-md'>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <LucideInfo size={32} />
                                </div>
                                <div>About</div>
                            </Link>
                            <a
                                href="https://ai-notes.xyz/docs/selfhost/selfhost-docker-build"
                                className='block p-3 border bg-cyan-100 rounded hover:shadow-md'
                            >
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {/* <LucideGitBranch size={32} /> */}
                                    <img
                                        src={iconGit}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                                <div>Git</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserHomepage;