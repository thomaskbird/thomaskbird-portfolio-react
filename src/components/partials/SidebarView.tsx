import * as React from "react";
import "./SidebarView.scss";
import { WidgetView } from "./WidgetView";
import {Content, SidebarData, Tag} from "../../interfaces";
import { Api } from "../../services/Api";
import {LoadingIndicator} from "./LoadingIndicator";
import {Link} from "react-router-dom";
import { SearchForm } from "./SearchForm";

interface SidebarViewProps {}

interface State {
  /**
   * The data for the sidebar
   */
  sidebarData: SidebarData | undefined;
  /**
   * api helper
   */
  api: any;
  /**
   * Indicates whether the api is loading data
   */
  isLoading: boolean;
  /**
   * The search term
   */
  searchTerm: string | undefined;
  /**
   * The array of font sizes generated
   */
  fontSizes: string[];
}

export class SidebarView extends React.Component<SidebarViewProps, State> {
  public static readonly displayName = "App component";

  constructor(props: SidebarViewProps, context: any) {
    super(props, context);

    this.state = {
      sidebarData: undefined,
      fontSizes: [],
      isLoading: true,
      searchTerm: undefined,
      api: new Api()
    };
  }

  public componentDidMount(): void {
    this.state.api.get(`/sidebar_data`).then((sidebarData: any) => {
      this.setState({
          sidebarData: {
            recentPosts: sidebarData.recent_posts,
            tags: sidebarData.tags
          },
          isLoading: false
      });

      this.generateFontSizes(sidebarData.tags.length);
    })
  }

  private generateFontSizes(numTags: number): void {
    const fontSizes = [];
    for(let i = 0; i < numTags; i++) {
      fontSizes.push(this.fontSizeGenerator());
    }

    this.setState({ fontSizes: fontSizes });
  }

  public render(): JSX.Element {
    if(this.state.isLoading) {
      return (
          <div className={"content-sidebar"} role="complementary">
            <LoadingIndicator
                isLoading={this.state.isLoading}
            />
          </div>
      );
    } else {
        return (
            <div className={"content-sidebar"} role="complementary">
                <WidgetView title={"Search"} isOpen={true}>
                    <SearchForm/>
                </WidgetView>

                <WidgetView title={"Recent Posts"}>
                    <ul>
                        {this.state.sidebarData!.recentPosts.map((post: Content, idx) => {
                          return (
                              <li key={idx}>
                                  <Link to={`/${post.slug}`}>{post.title}</Link>
                              </li>
                          )
                        })}
                    </ul>
                </WidgetView>

                <WidgetView title={"Tags"}>
                    <div className="tagcloud">
                        {this.state.sidebarData!.tags.map((tag: Tag, idx) => {
                            return (
                                <Link key={idx} to={`/list/${tag.slug}`} style={{ fontSize: this.state.fontSizes[idx] +"rem" }}>{tag.title} </Link>
                            )
                        })}
                    </div>
                </WidgetView>
            </div>
        );
    }
  }

  private fontSizeGenerator(): string {
      return (Math.random() * (1.500 - 0.7000) + 0.7000).toFixed(1);
  }
}
