import React, { useState, useRef, useEffect } from 'react';
// import { IoMdSubtitles, IoMdSubtitlesOff } from 'react-icons/io';
import { HiOutlineAdjustments } from 'react-icons/hi';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [fontSize, setFontSize] = useState(24);
    const [fontColor, setFontColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#000000');
    const [position, setPosition] = useState('bottom');

    useEffect(() => {
        const tracks = videoRef.current.textTracks[0];
        if (tracks) {
            const cues = tracks.cues;
            for (let i = 0; i < cues.length; i++) {
                cues[i].displayState = null;
            }
            videoRef.current.textTracks[0].mode = 'showing';
        }
    }, [fontSize, fontColor, bgColor, position]);

    // Function to toggle subtitle visibility
    const toggleSubtitles = () => {
        setSubtitlesEnabled(!subtitlesEnabled);
        const tracks = videoRef.current.textTracks;
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].mode = subtitlesEnabled ? 'disabled' : 'showing';
        }
    };

    // Function to apply subtitle styles
    const applySubtitleStyles = () => {
        const track = videoRef.current.textTracks[0];
        if (track) {
            const cueStyle = `
                ::cue {
                    font-size: ${fontSize}px;
                    color: ${fontColor};
                    background-color: ${bgColor};
                    text-align: center;
                    position: relative;
                    ${position === 'bottom' ? 'bottom: 0;' : 'top: 0;'}
                    padding: 2px 4px;
                    border-radius: 4px;
                }
            `;
            track.mode = 'hidden';
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = cueStyle;
            document.head.appendChild(styleSheet);
            track.mode = 'showing';
        }
    };

    useEffect(() => {
        if (subtitlesEnabled) {
            applySubtitleStyles();
        }
    }, [subtitlesEnabled, fontSize, fontColor, bgColor, position]);

    // Function to toggle settings visibility
    const toggleSettings = () => {
        setSettingsVisible(!settingsVisible);
    };

    return (
        <div className="relative max-w-3xl mx-auto my-8 shadow-lg rounded-lg overflow-hidden">
            <video ref={videoRef} controls className="w-full h-auto">
                <source
                    src="/ed_1024_512kb.mp4"
                    type="video/mp4"
                />
                <track
                    src="/subtitles.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                    default
                />
                Your browser does not support the video tag.
            </video>

            <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <button
                    onClick={toggleSubtitles}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition duration-300"
                    title={subtitlesEnabled ? "Disable Subtitles" : "Enable Subtitles"}
                >
                    {subtitlesEnabled ? (
                     <div>CC</div>
                    ) : (
                   <div></div>
                    )}
                </button>
                <button
                    onClick={toggleSettings}
                    className="px-4 py-2 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition duration-300"
                    title="Subtitle Settings"
                >
                    <HiOutlineAdjustments size={24} />
                </button>
            </div>

            {settingsVisible && (
                <div className="absolute bottom-4 left-4 p-4 bg-white shadow-lg rounded-md w-72 z-10">
                    <h3 className="text-lg font-semibold mb-2">Subtitle Settings</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium">Font Size</label>
                            <input
                                type="range"
                                min="10"
                                max="50"
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Font Color</label>
                            <input
                                type="color"
                                value={fontColor}
                                onChange={(e) => setFontColor(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Background Color</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Position</label>
                            <select
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-full border-gray-300 rounded-md"
                            >
                                <option value="bottom">Bottom</option>
                                <option value="top">Top</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
