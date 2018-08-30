import * as React from "react";
import "./SearchView.scss";

import { Api } from "../../services/Api";
import {SidebarView} from "../partials/SidebarView";
import {LoadingIndicator} from "../partials/LoadingIndicator";
import {Content} from "../../interfaces";
import {ListViewItem} from "../partials/ListViewItem";
import {RouteComponentProps} from "react-router";

interface SearchViewProps extends RouteComponentProps<any> {}

interface State {
    /**
     * Api object
     */
    api: any;
    /**
     * if true the loading indicator should display
     */
    isLoading: boolean;
    /**
     * The search term to use to search
     */
    term?: string | undefined;
    /**
     * The search results returned from api request
     */
    searchData: Content[] | undefined;
}

export class SearchView extends React.Component<SearchViewProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: SearchViewProps,
        context: any
    ) {
        super(props, context);

        this.state = {
            api: new Api(),
            term: undefined,
            searchData: undefined,
            isLoading: true,
        };
    }

    public componentDidMount(): void {
        if (this.props.match.params.term) {
            this.loadSearch(this.props.match.params.term);
        } else {
            this.setState({
              searchData: [],
              isLoading: false
            });
        }
    }

    private loadSearch(term: string): void {
        this.state.api.get(`/search/${term}`).then((results: any) => {
            this.setState({
                searchData: results.data,
                isLoading: false
            });
        })
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
                            {this.state.searchData!.map((item: Content, idx: number) => {
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
