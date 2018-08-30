import * as React from "react";
import "./SearchForm.scss";

interface SearchFormProps {}

interface State {
  /**
   * The search term
   */
  searchTerm: string;
}

export class SearchForm extends React.Component<SearchFormProps, State> {
  public static readonly displayName = "App component";

  constructor(props: SearchFormProps, context: any) {
    super(props, context);

    this.state = {
      searchTerm: "",
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
    // todo: Find better way to redirect
    window.location.href = `/search/${this.state.searchTerm}`;
    evt.preventDefault();
  }

  private handleChange(evt: any): void {
    this.setState({ searchTerm: evt.target.value });
  }
}
