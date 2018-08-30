import * as React from "react";
import { Link } from "react-router-dom";
import "./ResumeAbout.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ResumeAboutProps {
    /**
     * Determines whether the icon should be hidden
     */
    hideIcon?: boolean;
}

interface State {}

export class ResumeAbout extends React.Component<ResumeAboutProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ResumeAboutProps,
        context: any
    ) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        let icon: any;
        if(!this.props.hideIcon) {
            icon = (
                <Link to={"/resume/print"}>
                    <FontAwesomeIcon icon={"print"} />
                </Link>
            );
        } else {
            icon = "";
        }

        return (
            <div className={"ResumeAbout"}>
                <h2>
                    About me
                    {icon}
                </h2>

                <p>I have a diverse skill set complemented by having worked in a wide range of environments, ranging from large teams to small teams and freelance work. This diversity has helped me understand the web development process from start to finish having held many roles with multiple skill sets ranging from client services, design, front end and backend programming. This has helped me create better, well rounded applications that are both extensible and easy to use while also being aesthetically pleasing.</p>

                <p>I've created sophisticated web apps to help my clients manage complex process flows and increase productivity by bringing simplifying multiple processes through automation and building a web application to handle all of those requirements.</p>

                <p>Specialties: front end development, ui/ux, php, angularjs, JavaScript, jQuery, html5, css, design, emberjs, photoshop, ionic, backbone &amp; laravel.</p>
            </div>
        );
    }
}
