import * as React from "react";
import { Link } from "react-router-dom";
import "./NavMain.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface NavMainProps {
  onToggleMobileNav(): void;
  onCloseMobileNav(): void;
}

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
      <div className={"NavMainWrapper"}>
        <div
          className={"MobileIcon"}
          onClick={() => this.props.onToggleMobileNav()}
        >
          <FontAwesomeIcon icon={"bars"} />
        </div>
        <ul className={"NavMain"}>
          <li><Link to={"/"} onClick={() => this.props.onCloseMobileNav()}><FontAwesomeIcon icon={"home"} /> Home</Link></li>
          <li><Link to={"/list/portfolio"} onClick={() => this.props.onCloseMobileNav()}><FontAwesomeIcon icon={"briefcase"} /> Work</Link></li>
          <li><Link to={"/services"} onClick={() => this.props.onCloseMobileNav()}><FontAwesomeIcon icon={"list-alt"} /> Services</Link></li>
          <li><Link to={"/list/blog"} onClick={() => this.props.onCloseMobileNav()}><FontAwesomeIcon icon={"book"} /> Blog</Link></li>
          <li><Link to={"/resume"} onClick={() => this.props.onCloseMobileNav()}><FontAwesomeIcon icon={"file"} /> Resume</Link></li>
          <li><Link to={"/contact"} onClick={() => this.props.onCloseMobileNav()}><FontAwesomeIcon icon={"envelope"} /> Contact</Link></li>
        </ul>
      </div>
    );
  }
}
