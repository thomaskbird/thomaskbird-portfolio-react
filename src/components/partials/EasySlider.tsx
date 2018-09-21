import * as React from "react";
import "./EasySlider.scss";

import { Api } from "../../services/Api";
import { LoadingIndicator } from "./LoadingIndicator";
import {Link} from "react-router-dom";
import {Content} from "../../interfaces";
import {createDescription} from "../../Helpers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface EasySliderProps {
    /**
     * The slides to be displayed
     */
    slides: Content[] | undefined;
    /**
     * Defines the slide to start at
     */
    startAt?: number;
    /**
     * The defined slide interval or false for no auto
     */
    slideInterval?: number;
    /**
     * Determines whether there should previous/next btns
     */
    btns?: boolean;
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
     * Number of slides multiplied by 100
     */
    reelWidth: number;
    /**
     * The position the reel should be in
     */
    reelPosition: number;
    /**
     * The current slide
     */
    current: number;
    /**
     * The defined slide interval or false for no auto
     */
    slideInterval: boolean | number;
    /**
     * Total number of slides
     */
    total: number;
}

export class EasySlider extends React.Component<EasySliderProps, State> {
    public static readonly displayName = "App component";

    constructor(props: EasySliderProps, context: any) {
        super(props, context);

        this.state = {
            reelWidth: 0,
            reelPosition: 0,
            isLoading: true,
            slideInterval: false,
            total: 0,
            api: new Api(),
            current: 0
        };
    }

    /**
     * Variable the interval is running on
     */
    private intervalHandle: any;

    public componentDidMount(): void {
        this.setState({
            reelWidth: (this.props.slides!.length * 100),
            total: this.props.slides!.length,
            isLoading: false,
            current: 0
        });

        if(this.props.startAt) {
            this.setState({
                reelPosition: ((this.props.startAt - 1) * 100),
                current: (this.props.startAt - 1)
            });
        }

        if(this.props.slideInterval) {
            this.setState({ slideInterval: this.props.slideInterval });
            this.runInterval(this.props.slideInterval);
        }
    }

    public render(): JSX.Element {

        if (this.state.isLoading && this.props.slides) {
            return (
                <LoadingIndicator
                    isLoading={this.state.isLoading}
                />
            )
        } else {
            return (
                <div className={"easy-slider"}>
                    <div className={"easy-slider-viewport"}>
                        {this.props.btns ? (
                            <div className={"easy-slider-viewport-btn left"} onClick={() => { this.handleBtnClick("previous") }}>
                                <FontAwesomeIcon icon={"chevron-left"} className={`easy-slider-viewport-btn-icon`} />
                            </div>
                        ) : (undefined)}

                        <div className={"easy-slider-viewport-reel animated"} style={{ width: this.state.reelWidth +"%", left: "-"+ this.state.reelPosition +"%"}}>

                            {this.props.slides!.map((slide: Content, idx) => {
                                return (
                                    <div key={idx} className={"easy-slider-slide"}>
                                        <div className={"easy-slider-slide-left"}>
                                            <img
                                              className={this.state.current === idx ? "easy-slider-slide-left-img-desktop animated bounceInLeft" : "easy-slider-slide-left-img-desktop"}
                                              src={`http://api.thomaskbird.com/img/${slide.portfolio!.desktop}`}
                                            />
                                            <img
                                              className={this.state.current === idx ? "easy-slider-slide-left-img-mobile animated bounceInRight" : "easy-slider-slide-left-img-mobile"}
                                              src={`http://api.thomaskbird.com/img/${slide.portfolio!.mobile}`}
                                            />
                                        </div>
                                        <div className={this.state.current === idx ? "easy-slider-slide-right animated fadeInDown" : "easy-slider-slide-right"}>
                                            <h3>{slide.title}</h3>

                                            <p>{createDescription(slide.body, 250)}</p>

                                            <Link to={`/${slide.slug}`}>See more...</Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {this.props.btns ? (
                            <div className={"easy-slider-viewport-btn right"} onClick={() => { this.handleBtnClick("next") }}>
                                <FontAwesomeIcon icon={"chevron-right"} className={`easy-slider-viewport-btn-icon`} />
                            </div>
                        ) : (undefined)}
                    </div>
                    <div className={"easy-slider-pagination"}>
                        <div className={"easy-slider-pagination-holder"}>
                            {this.props.slides!.map((slide: Content, idx) => {
                               return (
                                   <span key={idx} onClick={() => {
                                       this.handlePaginationClick(idx)
                                   }}>
                                        <FontAwesomeIcon icon={"circle"} className={idx === this.state.current ? "easy-slider-pagination-item current" : "easy-slider-pagination-item"} />
                                   </span>
                               );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }

    private handleBtnClick(dir: string): void {
        let next = 0;

        switch(dir) {
          case "previous":
              if((this.state.current - 1) < 0) {
                  next = (this.state.total - 1);
              } else {
                  next = this.state.current - 1;
              }
          break;
          case "next":
              if((this.state.current + 1) < this.state.total) {
                  next = this.state.current + 1;
              } else {
                  next = 0;
              }
          break;
        }

        this.handlePaginationClick(next);
    }

    private handlePaginationClick(idx: number): void {
        this.setState({
            reelPosition: (idx * 100),
            current: idx
        });

        if(this.props.slideInterval) {
            clearInterval(this.intervalHandle);
        }
    }

    private runInterval(interval: number): void {
        this.intervalHandle = setInterval(() => {
            let next = 0;

            if((this.state.current + 1) < this.state.total) {
                next = this.state.current + 1;
            }
            this.handlePaginationClick(next);
        }, interval);
    }
}
