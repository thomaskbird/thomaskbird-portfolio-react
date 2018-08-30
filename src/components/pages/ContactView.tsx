import * as React from "react";
import "./ContactView.scss";

import { Api } from "../../services/Api";
import {SidebarView} from "../partials/SidebarView";
import {FormInput} from "../partials/FormInput";
import {FormTextarea} from "../partials/FormTextarea";
import {ContactData} from "../../interfaces";
import {LoadingIndicator} from "../partials/LoadingIndicator";

interface ContactViewProps {
}

interface State {
    /**
     * The data to be collected by the contact form
     */
    contactData: ContactData;
    /**
     * Api object
     */
    api: any;
    /**
     * Text to be displayed after contact form is submitted
     */
    status: string | undefined;
    /**
     * if true the loading indicator should display
     */
    isLoading: boolean;
}

export class ContactView extends React.Component<ContactViewProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ContactViewProps,
        context: any
    ) {
        super(props, context);

        this.state = {
            api: new Api(),
            status: undefined,
            isLoading: false,
            contactData: {
                name: undefined,
                email: undefined,
                phone: undefined,
                message: undefined
            }
        };
    }

    private nameApi: FormInput.Api | undefined;
    private emailApi: FormInput.Api | undefined;
    private phoneApi: FormInput.Api | undefined;
    private messageApi: FormTextarea.Api | undefined;

    public render(): JSX.Element {
        return (
            <div className={"container-outer"}>
                <div className={"container-inner row"}>
                    <div className={"content-main"}>

                        <LoadingIndicator
                            isLoading={this.state.isLoading}
                        />

                        <p>{this.state.status}</p>

                        <h2>Get in touch!</h2>

                        <p>Feel free to contact me using the short form below and I will be sure to contact you back as soon as possible!</p>

                        <form onSubmit={(evt: any) => { this.submit(evt); }}>
                            <FormInput
                                identifier={"name"}
                                val={this.state.contactData.name}
                                exposeApi={(nameApi): void => {
                                    this.nameApi = nameApi;
                                }}
                            />

                            <FormInput
                                identifier={"email"}
                                val={this.state.contactData.email}
                                exposeApi={(emailApi): void => {
                                    this.emailApi = emailApi;
                                }}
                            />

                            <FormInput
                                identifier={"phone"}
                                val={this.state.contactData.phone}
                                exposeApi={(phoneApi): void => {
                                    this.phoneApi = phoneApi;
                                }}
                            />

                            <FormTextarea
                                identifier={"message"}
                                val={this.state.contactData.message}
                                exposeApi={(messageApi): void => {
                                    this.messageApi = messageApi;
                                }}
                            />

                            <button type="submit" className="btn btn-primary">Send message</button>
                        </form>
                    </div>
                    <SidebarView />
                </div>
            </div>
        );
    }

    private submit(event: Event): void {
        this.setState({ isLoading: true });

        const submissionData = {
            name: this.nameApi!.getValue(),
            email: this.emailApi!.getValue(),
            phone: this.phoneApi!.getValue(),
            message: this.messageApi!.getValue()
        };

        this.state.api.post(
            `/contact`,
            submissionData
        ).then((response: any) => {
            this.setState({
                status: response.msg,
                isLoading: false,
                contactData: {
                    name: undefined,
                    email: undefined,
                    phone: undefined,
                    message: undefined
                }
            });
        }).catch((errors: any) => {
            console.log("errors", errors);
        });

        event.preventDefault();
    }
}
