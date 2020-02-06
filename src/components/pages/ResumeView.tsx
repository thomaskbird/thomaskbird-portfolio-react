import * as React from "react";
import "./ResumeView.scss";
import {SidebarView} from "../partials/SidebarView";
import { Api } from "../../services/Api";
import {LoadingIndicator} from "../partials/LoadingIndicator";
import {Job} from "../../interfaces";
import {ResumeItem} from "../partials/ResumeItem";
import {ResumeAbout} from "../partials/ResumeAbout";

interface ResumeViewProps {
    /**
     * Fires when element has rendered
     */
    onReady(): void;
}

interface State {
    /**
     * All of the pages data
     */
    jobs: Job[] | undefined;
    /**
     * Api object
     */
    api: any;
    /**
     * Indicates whether the view loading data
     */
    isLoading: boolean;
}

export class ResumeView extends React.Component<ResumeViewProps, State> {
    public static readonly displayName = "App component";
    private currentReady = 0;

    constructor(
        props: ResumeViewProps,
        context: any
    ) {
        super(props, context);

        this.state = {
            api: new Api(),
            jobs: undefined,
            isLoading: true
        };
    }

    public componentDidMount(): void {
        this.state.api.get("/resume").then((jobs: Job[]) => {
            this.setState({
                jobs: jobs,
                isLoading: false
            })
        });
    }

    public render(): JSX.Element {
        this.currentReady = 0;

        if(!this.state.isLoading) {
            // this.props.onReady();
        }

        return (
          <>
            <LoadingIndicator
              isLoading={this.state.isLoading}
            />
            <div className={"container-outer"}>
                <div className={"container-inner row"}>
                    <div className={"content-main"}>

                        <ResumeAbout/>

                        <div className={"resume-experience"}>
                            <h2>Experience</h2>

                            {this.state.jobs && this.state.jobs.map((item: Job, idx: number) => {
                                return (
                                    <ResumeItem
                                        key={idx}
                                        resume={item}
                                        idx={idx}
                                        onReady={() => {
                                            this.currentReady++;
                                            if(this.currentReady === this.state.jobs!.length) {
                                                this.props.onReady();
                                            }
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <SidebarView />
                </div>
            </div>
          </>
        );
    }
}
