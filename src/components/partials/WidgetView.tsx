import * as React from "react";
import "./WidgetView.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface WidgetViewProps {
  /**
   * Widget title
   */
  title: string;
  /**
   * open
   */
  isOpen?: boolean;
}

interface State {
    /**
     * Tracks whether widget is open
     */
    isOpen: boolean;
}

export class WidgetView extends React.Component<WidgetViewProps, State> {
  public static readonly displayName = "App component";

  constructor(props: WidgetViewProps, context: any) {
    super(props, context);

    this.state = {
        isOpen: false
    };
  }

  public componentDidMount(): void {
      if(this.props.isOpen) {
          this.setState({
              isOpen: true
          });
      }
  }

  public render(): JSX.Element {
    return (
      <div className={"widget"}>
        <div className="widget-title" onClick={() => { this.toggleOpen() }}>
          {this.props.title}:
          <FontAwesomeIcon className={"widget-title-icon"} icon={this.state.isOpen ? "chevron-up" : "chevron-down"} />
        </div>
        <div className={this.state.isOpen ? "widget-body open" : "widget-body"}>
          {this.props.children}
        </div>
      </div>
    );
  }

  private toggleOpen(): void {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }
}
