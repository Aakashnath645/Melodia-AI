
import React from 'react';

interface PianoProps {
  notesToHighlight: string[];
  startOctave?: number;
  octaveCount?: number;
}

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const Piano: React.FC<PianoProps> = ({ notesToHighlight, startOctave = 3, octaveCount = 2 }) => {
  const whiteKeyWidth = 40;
  const blackKeyWidth = 24;
  const whiteKeyHeight = 180;
  const blackKeyHeight = 110;

  const whiteKeys = notes.filter(n => !n.includes('#'));
  const normalizedNotesToHighlight = notesToHighlight.map(note => note.toUpperCase().replace('♭', 'b'));

  const renderOctave = (octave: number) => {
    let xOffset = 0;
    const keys = [];

    // Render white keys first
    for (let i = 0; i < whiteKeys.length; i++) {
      const noteName = whiteKeys[i];
      const fullNoteName = `${noteName}${octave}`;
      const isHighlighted = normalizedNotesToHighlight.includes(fullNoteName) || normalizedNotesToHighlight.includes(noteName);
      
      keys.push(
        <rect
          key={fullNoteName}
          x={xOffset}
          y="0"
          width={whiteKeyWidth}
          height={whiteKeyHeight}
          fill={isHighlighted ? 'rgb(168 85 247)' : 'white'}
          stroke="black"
          strokeWidth="1"
          className="transition-fill duration-200"
        />
      );
      xOffset += whiteKeyWidth;
    }

    xOffset = 0;
    // Render black keys on top
    for (let i = 0; i < notes.length; i++) {
      const noteName = notes[i];
      if (noteName.includes('#')) {
        const fullNoteName = `${noteName}${octave}`;
        const isHighlighted = normalizedNotesToHighlight.includes(fullNoteName) || normalizedNotesToHighlight.includes(noteName);

        keys.push(
          <rect
            key={fullNoteName}
            x={xOffset - blackKeyWidth / 2}
            y="0"
            width={blackKeyWidth}
            height={blackKeyHeight}
            fill={isHighlighted ? 'rgb(192 132 252)' : 'black'}
            stroke="black"
            strokeWidth="1"
            className="transition-fill duration-200"
          />
        );
      }
      
      if (!notes[i + 1]?.includes('#')) {
        xOffset += whiteKeyWidth;
      }
    }
    return keys;
  };

  const totalWhiteKeys = whiteKeys.length * octaveCount;
  const totalWidth = totalWhiteKeys * whiteKeyWidth;

  return (
    <div className="w-full flex justify-center p-4 bg-gray-800 rounded-lg shadow-inner overflow-x-auto">
        <svg
            width="100%"
            height={whiteKeyHeight}
            viewBox={`0 0 ${totalWidth} ${whiteKeyHeight}`}
            preserveAspectRatio="xMidYMid meet"
        >
            {Array.from({ length: octaveCount }, (_, i) => (
                <g key={i} transform={`translate(${i * whiteKeys.length * whiteKeyWidth}, 0)`}>
                    {renderOctave(startOctave + i)}
                </g>
            ))}
        </svg>
    </div>
  );
};

export default Piano;
