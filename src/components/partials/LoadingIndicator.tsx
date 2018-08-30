import * as React from "react";
import "./LoadingIndicator.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoadingIndicatorProps {
    /**
     * if true the loading indicator should display
     */
    isLoading: boolean;
}

interface State {}

export class LoadingIndicator extends React.Component<LoadingIndicatorProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: LoadingIndicatorProps,
        context: any
    ) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        if (this.props.isLoading) {
            return (
                <div className="loading">
                  <i className="fa fa-spin">
                    <FontAwesomeIcon icon={"circle-notch"}/>
                  </i>
                </div>
            );
        } else {
            return (
                <div />
            );
        }
    }
}
