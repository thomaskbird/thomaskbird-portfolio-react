import * as React from "react";
import {RouteProps} from "react-router";

export interface ScrollToTopProps extends RouteProps {}

interface State {}

export class ScrollToTop extends React.Component<ScrollToTopProps, State> {
    public static readonly displayName = "App component";

    constructor(props: ScrollToTopProps, context: any) {
        super(props, context);

        this.state = {};
    }

    public componentDidUpdate(prevProps: any): void {
        if(this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    public render(): any {
        return this.props.children;
    }
}
