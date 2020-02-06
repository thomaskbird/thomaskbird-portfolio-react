import * as React from "react";
import "./ListView.scss";
import {SidebarView} from "../partials/SidebarView";
import { Api } from "../../services/Api";
import { Content, PaginationData } from "../../interfaces";
import {ListViewItem} from "../partials/ListViewItem";
import {LoadingIndicator} from "../partials/LoadingIndicator";
import {RouteComponentProps, withRouter} from "react-router";
import { Paginator } from "../partials/Paginator";

interface ListViewProps extends RouteComponentProps<any> {
  onReady(): void;
}

interface State {
  /**
   * The current page slug
   */
  slug: string;
  /**
   * The current page
   */
  page: number | undefined;
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
  /**
   * The pagination information for generating pagination
   */
  paginationData: PaginationData | undefined;
}

// todo: this component needs to handle tags search and blog search
class ListView extends React.Component<ListViewProps, State> {
  public static readonly displayName = "App component";
  private currentReady = 0;

  constructor(
      props: ListViewProps,
      context: any
  ) {
      super(props, context);

    this.state = {
      api: new Api(),
      slug: props.match.params.slug,
      page: props.match.params.page || 1,
      content: undefined,
      paginationData: undefined,
      isLoading: true
    };

    this.loadPageData(
      props.match.params.slug,
      props.match.params.page || 1
    );
  }

  public componentWillReceiveProps(nextProps: any): void {
    if(
      this.state.slug !== nextProps.match.params.slug ||
      !!parseInt(nextProps.match.params.page, 10) &&
      parseInt(nextProps.match.params.page, 10) !== this.state.page
    ) {
      this.setState({
        slug: nextProps.match.params.slug,
        page: nextProps.match.params.page || 1,
        isLoading: true
      });

      this.loadPageData(
        nextProps.match.params.slug,
        nextProps.match.params.page || 1
      );
    }
  }

  public loadPageData(
    slug: string,
    page: number
  ): void {
      this.state.api.get(`/tag/${slug}?page=${page}`).then((content: any) => {
          const paginationInfo = this.extractPagination(content, slug);

          this.setState({
              page: paginationInfo.current_page,
              paginationData: paginationInfo,
              content: content.data,
              isLoading: false
          });
      });
  }

  private extractPagination(data: any, slug: string): PaginationData {
    const paginationInfo = {
      ...data
    };
    delete paginationInfo.data;
    paginationInfo.slug = slug;
    return paginationInfo;
  }

  public render(): JSX.Element {
    this.currentReady = 0;

    if(!this.state.isLoading) {
      this.props.onReady();
    }

    return (
      <>
        <LoadingIndicator
          isLoading={this.state.isLoading}
        />
        <div className={"container-outer"}>
            <div className={"container-inner row"}>
                <div className={"content-main"}>
                    {this.state.paginationData ? (<Paginator
                      paginationData={this.state.paginationData!}
                      onItemClick={() => this.props.onReady()}
                    />) : (undefined)}

                    {this.state.content && this.state.content!.map((item: Content, idx: number) => {
                        return (
                            <ListViewItem
                                key={idx}
                                content={item}
                                onReady={() => {
                                  this.currentReady++;
                                  if(this.currentReady === this.state.content!.length) {
                                    this.props.onReady();
                                  }
                                }}
                            />
                        );
                    })}

                    {this.state.paginationData ? (<Paginator
                      paginationData={this.state.paginationData!}
                      onItemClick={() => this.props.onReady()}
                    />) : (undefined)}
                </div>
                <SidebarView />
            </div>
        </div>
      </>
    );
  }
}

const ListViewWithRouter = withRouter(ListView);
export { ListViewWithRouter };
