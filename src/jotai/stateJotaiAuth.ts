import { atom } from 'jotai';

type AuthState = {
    isLoggedIn: 'pending' | 'true' | 'false';

    apiKeyGroqValid: boolean;
    apiKeyOpenrouterValid: boolean;
    apiKeyS3Valid: boolean;
    apiKeyOllamaValid: boolean;
    apiKeyQdrantValid: boolean;
    smtpValid: boolean;

    clientFrontendUrl: string;
};

const stateJotaiAuthAtom = atom<AuthState>({
    isLoggedIn: 'pending',

    apiKeyGroqValid: false,
    apiKeyOpenrouterValid: false,
    apiKeyS3Valid: false,
    apiKeyOllamaValid: false,
    apiKeyQdrantValid: false,
    smtpValid: false,

    clientFrontendUrl: '',
});

const stateJotaiAuthReloadAtom = atom<number>(0);

export {
    stateJotaiAuthReloadAtom
};

export default stateJotaiAuthAtom;