import "./Shell.scss";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import * as ReactGA from "react-ga";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
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
import { HomeView } from "./HomeView";
import { InsideView } from "./InsideView";
import { ListViewWithRouter } from "./ListView";
import { NavMain } from "../partials/NavMain";
import { Brand } from "../partials/Brand";
import { FooterPublic } from "../partials/FooterPublic";
import {ContactView} from "./ContactView";
import {ServicesView} from "./ServicesView";
import {SearchView} from "./SearchView";
import {ResumeView} from "./ResumeView";
import { RouteComponentProps } from "react-router";
import {scrollSpyer} from "../../Helpers";

library.add(
  faBars,
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

interface ThemeData {
  name: string;
  backgroundColor: string;
  borderColor: string;
}

const themes: ThemeData[] = [
  {
    name: "blue",
    backgroundColor: "#253f58",
    borderColor: "#000",
  },
  {
    name: "green",
    backgroundColor: "#4e847a",
    borderColor: "#2b443f",
  },
  {
    name: "red",
    backgroundColor: "#9e6161",
    borderColor: "#754646"
  },
  {
    name: "purple",
    backgroundColor: "#6d3a7d",
    borderColor: "#3f2248",
  }
];

export interface ShellProps extends RouteComponentProps<any> {
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
  /**
   * Header background color
   */
  headerBackgroundColor: string;
  /**
   * Header border color
   */
  headerBorderColor: string;
  /**
   * Controls whether the mobile nav is visible
   */
  isMobileNavOpen: boolean;
  /**
   * tracks the last theme color
   */
  randNum: number;
}

export class Shell extends React.Component<ShellProps, State> {
  public static readonly displayName = "App component";

  constructor(
    props: ShellProps,
    context: any
  ) {
    super(props, context);

    this.state = {
      path: undefined,
      isTop: true,
      headerBackgroundColor: themes[0].backgroundColor,
      headerBorderColor: themes[0].borderColor,
      isMobileNavOpen: false,
      randNum: 0,
    };

    ReactGA.initialize("UA-40542612-8");
    this.setPageData();
  }

  public componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void {
    if(this.state.path !== window.location.pathname) {
      this.setPageData();
      this.changeHeader();
    }
  }

  private generateRandNum() {
    return Math.floor(Math.random() * (3 - 0 + 1)) + 0;
  }

  private changeHeader(): void {
    const randNum = this.generateRandNum();

    const theme = themes[randNum];
    this.setState({
      headerBackgroundColor: theme.backgroundColor,
      headerBorderColor: theme.borderColor,
    });
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
          <div
            className={"container-outer nav-public"}
            style={{
              backgroundColor: this.state.headerBackgroundColor,
              borderColor: this.state.headerBorderColor,
            }}
          >
            <div className={"container-inner"}>
              <div className={"nav-public-left"}>
                <Brand/>
              </div>
              <div className={`nav-public-right ${this.state.isMobileNavOpen ? "open" : ""}`}>
                <NavMain
                  onToggleMobileNav={() => this.setState({ isMobileNavOpen: !this.state.isMobileNavOpen })}
                  onCloseMobileNav={() => this.setState({ isMobileNavOpen: false })}
                />
              </div>
            </div>
          </div>
          <div className={"container-outer whats-new"}>
            <div className={"container-inner"}>
              <b>Whats new:</b> Open to new contract remote roles!
            </div>
          </div>
        </div>

        <div className={"container-outer main-page-content"} onScroll={(evt) => { this.handleAppScroll(evt); }}>
          <Switch>
            <Route path={"/"} exact={true} component={HomeView} />
            <Route path={"/contact"} component={ContactView} />
            <Route path={"/services"} component={ServicesView} />
            <Route path={"/resume"}>
              <ResumeView
                onReady={() => scrollSpyer(".main-page-content", {
                  elementsToWatchOnScroll: ".ResumeItem",
                  desiredViewportHeightPercentage: 1
                })}
              />
            </Route>
            <Route path={"/search/:term?"} component={SearchView} />
            <Route path={"/list/:slug/:page?"}>
              <ListViewWithRouter
                onReady={() => scrollSpyer(".main-page-content")}
              />
            </Route>
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
