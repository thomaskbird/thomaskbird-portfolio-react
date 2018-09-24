import * as React from "react";
import { Link } from "react-router-dom";
import "./Paginator.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as _ from "lodash";
import { PaginationData } from "../../interfaces";

interface PaginatorProps {
  paginationData: PaginationData;
}

interface State {
  totalPages: number;
}

export class Paginator extends React.Component<PaginatorProps, State> {
  public static readonly displayName = "App component";

  constructor(
    props: PaginatorProps,
    context: any
  ) {
    super(props, context);

    this.state = {
      totalPages: 0
    };
  }

  public componentDidMount(): void {
    this.setState({
      totalPages: Math.ceil(this.props.paginationData.total / this.props.paginationData.per_page)
    });
    console.log("this.state.totalPages", this.state.totalPages);
  }

  public render(): JSX.Element {
    return (
      <ul className={"Paginator"}>
        {this.generateNoContent()}
        {this.generateFirstLink()}
        {this.generatePreviousLink()}
        {_.times(this.state.totalPages, (num) => {
          return this.generateNumberLink(num);
        })}
        {this.generateNextLink()}
        {this.generateLastLink()}
      </ul>
    );
  }

  private generateFirstLink(): any {
    if(this.props.paginationData.current_page > 1) {
      return (
        <li key={"first"}><Link to={`/list/${this.props.paginationData.slug}/1`}>First page</Link></li>
      );
    }
  }

  private generatePreviousLink(): any {
    if(this.props.paginationData.current_page > 1) {
      return (
        <li key={"previous"}><Link to={`/list/${this.props.paginationData.slug}/${(this.props.paginationData.current_page - 1)}`}>Previous</Link></li>
      );
    }
  }

  private generateLastLink(): any {
    if(this.props.paginationData.current_page < this.state.totalPages) {
      return (
        <li key={"last"}><Link to={`/list/${this.props.paginationData.slug}/${this.state.totalPages}`}>Last page</Link></li>
      );
    }
  }

  private generateNextLink(): any {
    if(this.props.paginationData.current_page < this.state.totalPages) {
      return (
        <li key={"next"}><Link to={`/list/${this.props.paginationData.slug}/${(this.props.paginationData.current_page + 1)}`}>Next</Link></li>
      );
    }
  }

  private generateNumberLink(num: number): any {
    if(this.state.totalPages > 1) {
      return (
        <li key={(num + 1)}><Link className={this.props.paginationData.current_page === (num + 1) ? "current" : ""} to={`/list/${this.props.paginationData.slug}/${(num + 1)}`}>{(num + 1)}</Link></li>
      );
    } else {
      return (
        <li className={"no-results"} key={1}>End of results...</li>
      );
    }
  }

  private generateNoContent(): any {
    if(this.state.totalPages === 0) {
      return (
        <li className={"no-results"} key={1}>No results...</li>
      );
    }
  }
}

/*
Example data:
{
  "current_page":1,
  "first_page_url":"http:\/\/api.thomaskbird.com\/api\/tag\/blog?page=1",
  "from":1,
  "last_page":2,
  "last_page_url":"http:\/\/api.thomaskbird.com\/api\/tag\/blog?page=2",
  "next_page_url":"http:\/\/api.thomaskbird.com\/api\/tag\/blog?page=2",
  "path":"http:\/\/api.thomaskbird.com\/api\/tag\/blog",
  "per_page":15,
  "prev_page_url":null,
  "to":15,
  "total":17
}
 */
