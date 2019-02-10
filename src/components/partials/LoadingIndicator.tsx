import * as React from "react";
import "./LoadingIndicator.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer = NodeJS.Timer;

interface LoadingIndicatorProps {
    /**
     * if true the loading indicator should display
     */
    isLoading: boolean;
}

interface State {
  /**
   * The changing dots trailing the loading text
   */
  loadingDecimalDisplay: number;
  loadingIntervalRunner: Timer | undefined;
}

export class LoadingIndicator extends React.Component<LoadingIndicatorProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: LoadingIndicatorProps,
        context: any
    ) {
        super(props, context);
        this.state = {
          loadingDecimalDisplay: 0,
          loadingIntervalRunner: undefined
        };
    }

    public componentWillMount(): void {
      const loadingIntervalRunner = setInterval(this.intervalRunner.bind(this), 1000);
      this.setState({ loadingIntervalRunner: loadingIntervalRunner });
    }

    public componentWillUnmount(): void {
      clearInterval(this.state.loadingIntervalRunner);
    }

    private loadingDecimals = [".", "..", "..."];

    public render(): JSX.Element {
        if (this.props.isLoading) {
            return (
                <div className="loading">
                    <div className={"loading-holder"}>
                      <h2>Loading{this.loadingDecimals[this.state.loadingDecimalDisplay]}</h2>
                      <i className="fa fa-spin">
                        <FontAwesomeIcon icon={"circle-notch"}/>
                      </i>
                    </div>
                </div>
            );
        } else {
            return (
                <></>
            );
        }
    }

    private intervalRunner(): void {
        if(this.state.loadingDecimalDisplay < 3) {
          this.setState({ loadingDecimalDisplay: (this.state.loadingDecimalDisplay + 1) });
        } else {
          this.setState({ loadingDecimalDisplay: 0 });
        }
    }
}
