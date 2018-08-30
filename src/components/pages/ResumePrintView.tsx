import * as React from "react";
import "./ResumePrintView.scss";

import { Api } from "../../services/Api";
import {Brand} from "../partials/Brand";
import {ContactInfo} from "../partials/ContactInfo";
import {Job} from "../../interfaces";
import {LoadingIndicator} from "../partials/LoadingIndicator";
import {ResumeAbout} from "../partials/ResumeAbout";
import {ResumeExperience} from "../partials/ResumeExperience";
import {Link} from "react-router-dom";

interface ResumePrintViewProps {}

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
     * if true the loading indicator should display
     */
    isLoading: boolean;
}

export class ResumePrintView extends React.Component<ResumePrintViewProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ResumePrintViewProps,
        context: any
    ) {
        super(props, context);

        this.state = {
            api: new Api(),
            jobs: undefined,
            isLoading: true,
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
        if(this.state.isLoading) {
            return (
                <LoadingIndicator
                    isLoading={this.state.isLoading}
                />
            );
        } else {
            return (
                <div className={"container-outer ResumePrintView"}>
                    <div className={"BrandContactInfo"}>
                        <div className={"BrandContactInfo-left"}>
                            <Brand/>
                            <ContactInfo/>
                        </div>
                        <div className={"BrandContactInfo-right"}>
                            <span className={"BrandContactInfo-right-links"}>
                                <button className={"btn btn-default"} onClick={this.triggerBrowserPrint}>PDF</button>
                                <button className={"btn btn-default"}>Word</button>
                                <Link className={"btn btn-default"} to={"/resume"}>Cancel</Link>
                            </span>
                        </div>
                    </div>
                    <div className={"ResumePrintView-content"}>
                        <ResumeAbout
                            hideIcon={true}
                        />

                        <ResumeExperience
                            jobs={this.state.jobs}
                        />
                    </div>
                    <div className={"BrandContactInfo"}>
                        <div className={"BrandContactInfo-left"}>
                            <Brand/>
                            <ContactInfo/>
                        </div>
                        <div className={"BrandContactInfo-right"}>
                            <span className={"BrandContactInfo-right-links"}>
                                <button className={"btn btn-default"} onClick={this.triggerBrowserPrint}>PDF</button>
                                <button className={"btn btn-default"}>Word</button>
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    private triggerBrowserPrint(): void {
        window.print();
    }
}
