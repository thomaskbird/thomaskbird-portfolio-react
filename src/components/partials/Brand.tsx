import * as React from "react";
import { Link } from "react-router-dom";
import "./Brand.scss";

interface BrandProps {
  linked?: boolean;
}

interface State {}

export class Brand extends React.Component<BrandProps, State> {
  public static readonly displayName = "App component";

  private static defaultProps = {
    linked: true,
  };

  constructor(
    props: BrandProps,
    context: any
  ) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return this.props.linked ? (
      <Link to="/">
        <span className={"brand"}>
          <span className={"brand-name"}>ThomasBird</span>
          <span className={"brand-title"}>FullStackDeveloper</span>
        </span>
      </Link>
    ) : (
      <span className={"brand"}>
        <span className={"brand-name"}>ThomasBird</span>
        <span className={"brand-title"}>FullStackDeveloper</span>
      </span>
    );
  }
}
