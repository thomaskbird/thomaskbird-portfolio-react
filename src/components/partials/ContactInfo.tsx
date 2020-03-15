import * as React from "react";
import "./ContactInfo.scss";

interface ContactInfoProps {}

interface State {}

export class ContactInfo extends React.Component<ContactInfoProps, State> {
    public static readonly displayName = "App component";

    constructor(
        props: ContactInfoProps,
        context: any
    ) {
        super(props, context);

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <span className={"ContactInfo"}>Toledo, OH | P: 313-410-3709 | E: Thomas.Bird1984@gmail.com | W: ThomasKBird.com</span>
        );
    }
}
