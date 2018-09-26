import "./App.scss";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { ResumePrintView } from "./pages/ResumePrintView";
import { Shell } from "./pages/Shell";

export interface AppProps extends RouteComponentProps<any> {}

interface State {}

export class App extends React.Component<AppProps, State> {
  public static readonly displayName = "App component";

  constructor(props: AppProps, context: any) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <Switch>
        <Route path={"/resume/print"} component={ResumePrintView} />
        <Route component={Shell} />
      </Switch>
    );
  }
}
