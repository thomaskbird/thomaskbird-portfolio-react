import * as React from "react";
import ReactHtmlParser from "react-html-parser";
import "./InsideView.scss";

import { SidebarView } from "../partials/SidebarView";
import { Api } from "../../services/Api";
import { Content } from "../../interfaces";
import { LoadingIndicator } from "../partials/LoadingIndicator";
import { RouteComponentProps } from "react-router";

interface InsideViewProps extends RouteComponentProps<any> {}

interface State {
  /**
   * The current page slug
   */
  slug: string;
  /**
   * The type of data to be loaded [skill|job|service|content]
   */
  type: string;
  /**
   * All of the pages data
   */
  page: Content | undefined;
  /**
   * Api object
   */
  api: any;
  /**
   * Indicates whether the view loading data
   */
  isLoading: boolean;
}

export class InsideView extends React.Component<InsideViewProps, State> {
  public static readonly displayName = "App component";

  constructor(
      props: InsideViewProps,
      context: any
  ) {
    super(props, context);

    this.state = {
      api: new Api(),
      slug: props.match.params.slug,
      type: props.match.params.contentType,
      page: undefined,
      isLoading: true
    };

    this.loadPageData(props.match.params.slug, props.match.params.contentType);
  }

  public componentWillReceiveProps(nextProps: any): void {
    if(this.state.slug !== nextProps.match.params.slug) {
      this.setState({
        slug: nextProps.match.params.slug,
        type: nextProps.match.params.contentType
      });
      this.loadPageData(nextProps.match.params.slug, nextProps.match.params.contentType);
    }
  }

  private loadPageData(slug: string, type: string | boolean = false): void {
    const url = type ? `/content/${slug}/${type}` : `/content/${slug}`;
    this.state.api.get(url).then((content: Content) => {
      this.setState({
          page: content,
          isLoading: false
      });
    });
  }

  public render(): JSX.Element {
    if(!this.state.isLoading) {
      if(this.state.page) {
        if(this.state.page.portfolio) {
          return (
            <div className={"container-outer"}>
              <div className={"container-inner row"}>
                <div className={"content-main"}>
                  <LoadingIndicator
                    isLoading={this.state.isLoading}
                  />

                  <div className={"InsideView-featured"}>
                    <img className={"InsideView-featured-img"} src={this.state.page.portfolio ? `http://api.thomaskbird.com/img/${this.state.page.portfolio.featured}` : ""} />
                  </div>

                  <h2 className={"content-main-title"}>{this.state.page.title}</h2>

                  {ReactHtmlParser(this.state.page.body)}
                </div>
                <SidebarView />
              </div>
            </div>
          );
        } else {
          return (
            <div className={"container-outer"}>
              <div className={"container-inner row"}>
                <div className={"content-main"}>
                  <LoadingIndicator
                    isLoading={this.state.isLoading}
                  />

                  <h2 className={"content-main-title"}>{this.state.page.title}</h2>

                  {ReactHtmlParser(this.state.page.body)}
                </div>
                <SidebarView />
              </div>
            </div>
          );
        }
      } else {
          return (
              <div className={"container-outer"}>
                  <div className={"container-inner row"}>
                      <div className={"content-main"}>
                          <h2>Uh oh, the page you were looking for can't be found please try again!</h2>
                      </div>
                      <SidebarView />
                  </div>
              </div>
          );
      }
    } else {
      return (
          <div className={"container-outer"}>
              <div className={"container-inner row"}>
                  <div className={"content-main"}>
                      <LoadingIndicator
                          isLoading={this.state.isLoading}
                      />
                  </div>
                  <SidebarView />
              </div>
          </div>
      );
    }
  }
}
