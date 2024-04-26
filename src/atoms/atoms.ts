
import { IResult, ISearchWithImage } from '@/types';
import { atom } from 'jotai';


export const toggleSideNavigation = atom<Boolean>(true);

export const modalOpen = atom<Boolean>(false);

export const searchPrompt = atom<string>('');

export const searchPromptWithImage = atom<ISearchWithImage>({
    keyword: '',
    files: []
});

export const searchResultAtom = atom<IResult>({
    loading: false,
    error: null,
    data: [],
});


export const libraryResultsAtom = atom<{
    key: string,
    value: string
}[]>([{
    key: '',
    value: ''
}]);