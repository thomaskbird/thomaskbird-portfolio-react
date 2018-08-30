import * as React from "react";
import "./ResumeExperience.scss";
import {Job} from "../../interfaces";
import {ResumeItem} from "./ResumeItem";

interface ResumeExperienceProps {
    /**
     * All of the pages data
     */
    jobs: Job[] | undefined;
}

interface State {}

export class ResumeExperience extends React.Component<ResumeExperienceProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ResumeExperienceProps,
        context: any
    ) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={"ResumeExperience"}>
                <h2>Experience</h2>

                {this.props.jobs!.map((item: Job, idx: number) => {
                    return (
                        <ResumeItem
                            key={idx}
                            resume={item}
                            idx={idx}
                        />
                    );
                })}
            </div>
        );
    }
}
