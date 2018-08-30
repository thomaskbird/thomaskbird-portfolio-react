import * as React from "react";
import "./FormInput.scss";

interface FormInputProps {
    /**
     * The inputs unique identifier
     */
    identifier: string;
    /**
     * The inputs value
     */
    val?: string | undefined;
    /**
     * The label text
     */
    labelText?: string;
    /**
     * Exposes api with method to retrieve the inputs value
     */
    exposeApi(
        formInputApi: FormInput.Api
    ): void;
}

interface State {
    val: string | undefined;
}

export class FormInput extends React.Component<FormInputProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: FormInputProps,
        context: any
    ) {
        super(props, context);

        this.state = {
            val: undefined
        };

        const formInputApi: FormInput.Api = {
            getValue: () => {
                return this.state.val;
            }
        };

        this.props.exposeApi(formInputApi);
    }

    public render(): JSX.Element {
        return (
            <div className={"form-group"}>
                <label htmlFor={this.props.identifier}>{this.props.labelText || this.props.identifier}:</label>
                <input type="text" name={this.props.identifier} id={this.props.identifier} value={this.props.val} onChange={(event) => {
                    this.handleChange(event);
                }} />
            </div>
        );
    }

    private handleChange(evt: any): void {
        this.setState({ val: evt.target.value });
    }
}

export namespace FormInput {
    export interface Api {
        getValue(): void;
    }
}
