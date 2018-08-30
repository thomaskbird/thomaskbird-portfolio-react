import * as React from "react";
import "./ServicesView.scss";

import { Api } from "../../services/Api";
import { LoadingIndicator } from "../partials/LoadingIndicator";
import {SidebarView} from "../partials/SidebarView";
import {Service} from "../../interfaces";
import {ServiceViewItem} from "../partials/ServiceViewItem";

interface ServicesViewProps {
}

interface State {
    /**
     * Api object
     */
    api: any;
    /**
     * Whether the api has completed the request
     */
    isLoading: boolean;
    /**
     * The list of services
     */
    services: Service[] | undefined;
}

export class ServicesView extends React.Component<ServicesViewProps, State> {
    public static readonly displayName = "App component";

    constructor(props: ServicesViewProps, context: any) {
        super(props, context);

        this.state = {
            isLoading: true,
            services: undefined,
            api: new Api()
        };
    }

    public componentDidMount(): void {
        this.state.api.get("/services").then((services: any) => {
            this.setState({
                isLoading: false,
                services: services.data
            });
        });
        this.setState({ isLoading: false });
    }

    public render(): JSX.Element {
        if (this.state.isLoading || this.state.services === undefined) {
            return (
                <LoadingIndicator
                    isLoading={this.state.isLoading}
                />
            )
        } else {
            return (
                <div className={"container-outer"}>
                    <div className={"container-inner row"}>
                        <div className={"content-main"}>
                            <LoadingIndicator
                                isLoading={this.state.isLoading}
                            />

                            <div className={"ServicesView"}>
                            {this.state.services!.map((service: Service, idx) => {
                                return (
                                    <ServiceViewItem
                                        key={idx}
                                        service={service}
                                    />
                                )
                            })}
                            </div>
                        </div>
                        <SidebarView />
                    </div>
                </div>
            );
        }
    }
}
