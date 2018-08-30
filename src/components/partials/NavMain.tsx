import * as React from "react";
import { Link } from "react-router-dom";
import "./NavMain.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface NavMainProps {}

interface State {}

export class NavMain extends React.Component<NavMainProps, State> {
  public static readonly displayName = "App component";

  constructor(
    props: NavMainProps,
    context: any
  ) {
    super(props, context);

    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <ul className={"NavMain"}>
        <li><Link to={"/"}><FontAwesomeIcon icon={"home"} /> Home</Link></li>
        <li><Link to={"/list/portfolio"}><FontAwesomeIcon icon={"briefcase"} /> Work</Link></li>
        <li><Link to={"/services"}><FontAwesomeIcon icon={"list-alt"} /> Services</Link></li>
        <li><Link to={"/list/blog"}><FontAwesomeIcon icon={"book"} /> Blog</Link></li>
        <li><Link to={"/resume"}><FontAwesomeIcon icon={"file"} /> Resume</Link></li>
        <li><Link to={"/contact"}><FontAwesomeIcon icon={"envelope"} /> Contact</Link></li>
      </ul>
    );
  }
}
