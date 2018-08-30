import * as React from "react";
import "./ListView.scss";
import {SidebarView} from "../partials/SidebarView";
import { Api } from "../../services/Api";
import {Content} from "../../interfaces";
import {ListViewItem} from "../partials/ListViewItem";
import {LoadingIndicator} from "../partials/LoadingIndicator";
import { RouteComponentProps } from "react-router";

interface ListViewProps extends RouteComponentProps<any> {
}

interface State {
  /**
   * The current page slug
   */
  slug: string;
  /**
   * All of the pages data
   */
  content: Content[] | undefined;
  /**
   * Api object
   */
  api: any;
  /**
   * Indicates whether the view loading data
   */
  isLoading: boolean;
}

// todo: this component needs to handle tags search and blog search
export class ListView extends React.Component<ListViewProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ListViewProps,
        context: any
    ) {
        super(props, context);

      this.state = {
        api: new Api(),
        slug: props.match.params.slug,
        content: undefined,
        isLoading: true
      };

      this.loadPageData(props.match.params.slug);
    }

  public componentWillReceiveProps(nextProps: any): void {
    if(this.state.slug !== nextProps.match.params.slug) {
      this.setState({
        slug: nextProps.match.params.slug,
        isLoading: true
      });
      this.loadPageData(nextProps.match.params.slug);
    }
  }

    public loadPageData(slug: string): void {
        this.state.api.get(`/tag/${slug}`).then((content: any) => {
            this.setState({
                content: content.data,
                isLoading: false
            });
        });
    }

    public render(): JSX.Element {
        if(this.state.isLoading) {
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
        } else {
            return (
                <div className={"container-outer"}>
                    <div className={"container-inner row"}>
                        <div className={"content-main"}>
                            {this.state.content!.map((item: Content, idx: number) => {
                                return (
                                    <ListViewItem
                                        key={idx}
                                        content={item}
                                    />
                                );
                            })}
                        </div>
                        <SidebarView />
                    </div>
                </div>
            );
        }
    }
}
