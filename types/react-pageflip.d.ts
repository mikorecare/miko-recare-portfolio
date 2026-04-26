declare module 'react-pageflip' {
    import { Component } from 'react';

    interface HTMLFlipBookProps {
        width: number;
        height: number;
        size?: 'fixed' | 'stretch';
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        drawShadow?: boolean;
        flippingTime?: number;
        usePortrait?: boolean;
        startZIndex?: number;
        autoSize?: boolean;
        maxShadowOpacity?: number;
        showCover?: boolean;
        mobileScrollSupport?: boolean;
        className?: string;
        style?: React.CSSProperties;
        startPage?: number;
        onFlip?: (e: any) => void;
        children?: React.ReactNode;
        useMouseEvents?: boolean;
        swipeDistance?: number
        clickEventForward?: boolean
    }

    export default class HTMLFlipBook extends Component<HTMLFlipBookProps> { }
}