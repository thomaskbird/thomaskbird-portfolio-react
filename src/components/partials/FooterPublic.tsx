import * as React from "react";
import "./FooterPublic.scss";

interface FooterPublicProps {}

interface State {}

export class FooterPublic extends React.Component<FooterPublicProps, State> {
  public static readonly displayName = "App component";

  constructor(
    props: FooterPublicProps,
    context: any
  ) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <p>&copy; Copyright 2018 All Rights Reserved</p>
    );
  }
}
