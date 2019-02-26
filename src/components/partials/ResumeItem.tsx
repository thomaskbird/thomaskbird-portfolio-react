import * as React from "react";
import * as moment from "moment";
import "./ResumeItem.scss";

import {Job} from "../../interfaces";
import {createDescription} from "../../Helpers";

interface ResumeItemProps {
    /**
     * All of the pages data
     */
    resume: Job;
    /**
     * index of item
     */
    idx: number;
  /**
   * Defines whether this is the print view
   */
  isPrintView?: boolean;
}

interface State {}

export class ResumeItem extends React.Component<ResumeItemProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ResumeItemProps,
        context: any
    ) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.idx % 2 === 0 ? "ResumeItem" : "ResumeItem alt"}>
                <div className={"ResumeItem-img"}>
                    <img src={`http://api.thomaskbird.com/img/${this.props.resume.logo}`} alt={this.props.resume.title} />
                </div>
                <div className={"ResumeItem-content"}>
                    <div className={"ResumeItem-content-header"}>
                        <div className={"ResumeItem-content-header-left"}>
                            <h3 className={"ResumeItem-content-header-left-company"}>
                                {this.props.resume.company.name}
                                <span className={"ResumeItem-content-header-left-title"}>
                                    {this.props.resume.title}
                                </span>
                            </h3>
                        </div>
                        <div className={"ResumeItem-content-header-right"}>
                            <span className={"ResumeItem-content-header-right-type"}>{this.props.resume.type}</span>
                            {moment(this.props.resume.start_at).format("MMM, YYYY")} - {moment(this.props.resume.end_at).isAfter() ? "Present" : moment(this.props.resume.end_at).format("MMM, YYYY")}
                        </div>
                    </div>
                    <div className={"ResumeItem-content-body"}>
                        <p>{this.props.isPrintView ? createDescription(this.props.resume.body) : createDescription(this.props.resume.body, 300)}</p>
                    </div>
                </div>
            </div>
        );
    }
}
