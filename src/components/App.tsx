import "./App.scss";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import * as ReactGA from "react-ga";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronUp,
  faChevronDown,
  faCircle,
  faHome,
  faBriefcase,
  faListAlt,
  faBook,
  faFile,
  faEnvelope,
  faPrint,
  faFilePdf,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons/faCircleNotch";

// views
import { HomeView } from "./pages/HomeView";
import { InsideView } from "./pages/InsideView";
import { ListView } from "./pages/ListView";
import { NavMain } from "./partials/NavMain";
import { Brand } from "./partials/Brand";
import { FooterPublic } from "./partials/FooterPublic";
import {ContactView} from "./pages/ContactView";
import {ServicesView} from "./pages/ServicesView";
import {SearchView} from "./pages/SearchView";
import {ResumeView} from "./pages/ResumeView";
import {ResumePrintView} from "./pages/ResumePrintView";
import { RouteComponentProps } from "react-router";

library.add(
  faChevronDown,
  faChevronUp,
  faCircle,
  faHome,
  faBriefcase,
  faListAlt,
  faBook,
  faFile,
  faEnvelope,
  faPrint,
  faFilePdf,
  faCircleNotch,
  faChevronLeft,
  faChevronRight,
);

export interface AppProps extends RouteComponentProps<any> {
  config?: object;
}

interface State {
  /**
   * Defines whether the page is at the top
   */
  isTop: boolean;
  /**
   * The current path
   */
  path: string | undefined;
}

export class App extends React.Component<AppProps, State> {
  public static readonly displayName = "App component";

  constructor(props: AppProps, context: any) {
    super(props, context);

    this.state = {
      path: undefined,
      isTop: true
    };

    ReactGA.initialize("UA-40542612-8");
    this.setPageData();
  }

  public componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void {
    if(this.state.path !== window.location.pathname) {
      this.setPageData();
    }
  }

  private setPageData(): void {
    const path = window.location.pathname;
    this.setState({ path: path });
    ReactGA.pageview(path);
  }

  public render(): JSX.Element {
    return (
      <div className={"overall-wrapper"}>
        <div className={this.state.isTop ? "header-wrap animate-height" : "header-wrap animate-height hide"}>
          <div className={"container-outer nav-public"}>
            <div className={"container-inner"}>
              <div className={"nav-public-left"}>
                <Brand/>
              </div>
              <div className={"nav-public-right"}>
                <NavMain/>
              </div>
            </div>
          </div>
          <div className={"container-outer whats-new"}>
            <div className={"container-inner"}>
              <b>Whats new:</b> This is just some test text
            </div>
          </div>
        </div>

        <div className={"container-outer main-page-content"} onScroll={(evt) => { this.handleAppScroll(evt); }}>
          <Switch>
            <Route path={"/"} exact={true} component={HomeView} />
            <Route path={"/contact"} component={ContactView} />
            <Route path={"/services"} component={ServicesView} />
            <Route path={"/resume/print"} component={ResumePrintView} />
            <Route path={"/resume"} component={ResumeView} />
            <Route path={"/search/:term?"} component={SearchView} />
            <Route path={"/list/:slug/:page?"} component={ListView} />
            <Route path={"/:slug/:contentType?"} component={InsideView} />
            <Route component={InsideView} />
          </Switch>
        </div>

        <div className={this.state.isTop ? "container-outer footer animate-height" : "container-outer footer animate-height hide"}>
          <div className={"container-inner"}>
            <FooterPublic/>
          </div>
        </div>
      </div>
    );
  }

  private handleAppScroll(evt: any): void {
    const scrollTop = evt.target.scrollTop;
    this.setState({
      isTop: !(scrollTop > 50)
    });
  }
}
