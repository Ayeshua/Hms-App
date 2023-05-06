import { registerSheet } from 'react-native-actions-sheet';
import CommentInputSheet from './comment-input-sheet';

registerSheet('comment-input-sheet', CommentInputSheet,'add','cap','global');

export {};
