import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Panel from 'components/common/Panel';
import FormInput from 'components/common/FormInput';
import StreamBadge from 'components/stream/StreamBadge';
import AnalysisBadge from 'components/stream/AnalysisBadge';
import EditableField from 'components/common/EditableField';
import Button from 'components/common/Button';
import api from 'utils/api';
import routeBuilder from 'utils/routeBuilder';

const LiveStreamCard = (props) => {
    const net = props.network_information;

    const from = `${net.source_address}:${net.source_port}`;
    const to = `${net.destination_address}:${net.destination_port}`;

    const mediaTypeIsKnown = props.media_type !== 'unknown';
    const globalStatus = props.global_video_analysis;

    // todo: check if it's video or audio... audio will fail to render

    const isLive = props.state === 'on_going_analysis';

    const route = routeBuilder.live_stream_page(props.id);

    const panelClassName = classNames('slow-fade-in', {
        inactive: !isLive
    });

    const title = props.alias ? props.alias : props.title;

    return (
        <Panel
            containerClassName={panelClassName}
            title={
                <div className="row lst-panel__header lst-truncate">
                    <div className="col-xs-10">
                        <h2 className="lst-no-margin fit-to-div">
                            <EditableField
                                value={title}
                                className="lst-no-margin"
                                updateFunction={data => api.changeLiveStreamName(props.id, { name: data })}
                            />
                        </h2>
                    </div>
                    <div className="col-xs-2 end-xs lst-no-padding">
                        <Button
                            key={`delete-stream-${props.id}`}
                            className="lst-panel rightToolbar"
                            icon="delete"
                            type="danger"
                            link
                            onClick={(evt) => {
                                evt.stopPropagation();
                                props.onDeleteButtonClicked(props.id);
                            }}
                        />
                    </div>
                </div>
            }
        >
            <Link key={`streams-${props.id}`} to={route} className="lst-href-no-style">
                <FormInput className="lst-no-margin" icon="arrow upward" labelColSize={2} valueColSize={10}>
                    {from}
                </FormInput>
                <FormInput className="lst-no-margin" icon="arrow downward" labelColSize={2} valueColSize={10}>
                    {to}
                </FormInput>
                { mediaTypeIsKnown && (
                    <div className="row lst-no-margin">
                        {!props.lowInformation &&
                        <StreamBadge media_type={props.media_type} media_specific={props.media_specific} />}
                        <AnalysisBadge name="ST2110-21" compliance={globalStatus.compliance} />
                    </div>
                )}
            </Link>
        </Panel>
    );
};

export default LiveStreamCard;
