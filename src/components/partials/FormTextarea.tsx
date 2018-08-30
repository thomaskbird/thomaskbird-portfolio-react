import * as React from "react";
import "./FormTextarea.scss";

interface FormTextareaProps {
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
        formTextareaApi: FormTextarea.Api
    ): void;
}

interface State {
    val: string | undefined;
}

export class FormTextarea extends React.Component<FormTextareaProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: FormTextareaProps,
        context: any
    ) {
        super(props, context);

        this.state = {
            val: undefined
        };

        const formTextareaApi: FormTextarea.Api = {
            getValue: () => {
                return this.state.val;
            }
        };

        this.props.exposeApi(formTextareaApi);
    }

    public render(): JSX.Element {
        return (
            <div className={"form-group"}>
                <label htmlFor={this.props.identifier}>{this.props.labelText || this.props.identifier}:</label>
                <textarea name={this.props.identifier} id={this.props.identifier} onChange={(evt) => {
                    this.handleChange(evt);
                }}>{this.props.val}</textarea>
            </div>
        );
    }

    private handleChange(evt: any): void {
        this.setState({ val: evt.target.value });
    }
}

export namespace FormTextarea {
    export interface Api {
        getValue(): void;
    }
}
