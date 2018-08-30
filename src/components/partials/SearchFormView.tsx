import * as React from "react";
import "./SearchFormView.scss";

interface SidebarViewProps {}

interface State {
  /**
   * The search term
   */
  searchTerm: string | undefined;
}

export class SearchFormView extends React.Component<SidebarViewProps, State> {
  public static readonly displayName = "App component";

  constructor(props: SidebarViewProps, context: any) {
    super(props, context);

    this.state = {
      searchTerm: undefined
    };
  }

  public render(): JSX.Element {
    return (
      <form onSubmit={(evt: any) => { this.submitSearch(evt); }}>
        <div className="input-group">
          <input className="form-control" placeholder="Enter search..." name="term" type="text" value={this.state.searchTerm} onChange={(event) => {
            this.handleChange(event);
          }} />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit">Search</button>
          </span>
        </div>
      </form>
    );
  }

  private submitSearch(evt: any): void {
    window.location = `/search/${this.state.searchTerm}`;
    evt.preventDefault();
  }

  private handleChange(evt: any): void {
    this.setState({ searchTerm: evt.target.value });
  }
}
