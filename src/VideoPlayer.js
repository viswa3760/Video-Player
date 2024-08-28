import React, { useState, useRef } from 'react';
import { IoVolumeMute, IoVolumeHigh } from 'react-icons/io5'; // Import icons
import { HiOutlineAdjustments } from 'react-icons/hi';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [fontSize, setFontSize] = useState(24);
    const [fontColor, setFontColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#000000');
    const [position, setPosition] = useState('bottom');
    const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
    const [settingsVisible, setSettingsVisible] = useState(false);

    // Function to handle subtitle style changes
    const handleStyleChange = (style, value) => {
        if (style === 'fontSize') setFontSize(value);
        if (style === 'fontColor') setFontColor(value);
        if (style === 'bgColor') setBgColor(value);
        if (style === 'position') setPosition(value);
    };

    // Function to toggle subtitle visibility
    const toggleSubtitles = () => {
        setSubtitlesEnabled(!subtitlesEnabled);
        const tracks = videoRef.current.textTracks;
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].mode = subtitlesEnabled ? 'disabled' : 'showing';
        }
    };

    // Function to toggle settings visibility
    const toggleSettings = () => {
        setSettingsVisible(!settingsVisible);
    };

    return (
        <div className="relative max-w-2xl mx-auto my-8">
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center space-x-2"
                >
                    {subtitlesEnabled ? (
                        <>
                            <IoVolumeHigh size={24} />
                            <span>Disable Subtitles</span>
                        </>
                    ) : (
                        <>
                            <IoVolumeMute size={24} />
                            <span>Enable Subtitles</span>
                        </>
                    )}
                </button>
                <button
                    onClick={toggleSettings}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center space-x-2"
                >
                    <HiOutlineAdjustments size={24} />
                    <span>Settings</span>
                </button>
            </div>

            {settingsVisible && (
                <div className="absolute bottom-4 left-4 p-4 bg-white shadow-lg rounded-md w-64 z-10">
                    <h3 className="text-lg font-semibold mb-2">Subtitle Settings</h3>
                    <div className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium">Font Size</label>
                            <input
                                type="range"
                                min="10"
                                max="50"
                                value={fontSize}
                                onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Font Color</label>
                            <input
                                type="color"
                                value={fontColor}
                                onChange={(e) => handleStyleChange('fontColor', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Background Color</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => handleStyleChange('bgColor', e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Position</label>
                            <select
                                value={position}
                                onChange={(e) => handleStyleChange('position', e.target.value)}
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
