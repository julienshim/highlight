import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import NotesContext from '../context/notes-context';
import InlineEditIdentifier from './InlineEditIdentifier';
import CommentSubtitle from './CommentSubtitle';
import CommentContent from './CommentContent';
import CommentHeader from './CommentHeader';
import CommentFooter from './CommentFooter';
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';

const EditNote = () => {
  // eslint-disable-next-line no-unused-vars
  const { notes, dispatchNotes } = useContext(NotesContext);
  const history = useHistory();
  const { id } = useParams();

  const [refId, setRefId] = useState('Unidentified');
  const [header, setHeader] = useState('');
  const [title, setTitle] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [footer, setFooter] = useState('');
  const [summary, setSummary] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (notes[id]) {
      setRefId(notes[id].refId);
      setScenarios(notes[id].body.scenarios);
      setTitle(notes[id].body.title);
      setHeader(notes[id].header);
      setFooter(notes[id].footer);
    }
  }, [id, notes]);

  useEffect(() => {
    setIsSaved(false);
  }, [footer, scenarios, title, header, refId]);

  const addNote = (event) => {
    event.preventDefault();
    dispatchNotes({
      type: 'EDIT_NOTE',
      note_id: parseInt(id, 10),
      refId: refId === '' ? 'Unidentified' : refId,
      header,
      body: {
        title,
        scenarios,
      },
      footer,
      summary,
    });
    setIsSaved(true);
    // history.push("/notes");
  };

  useEffect(() => {
    const filteredScenarios = scenarios.filter(
      (scenario) =>
        scenario.subtitleComments !== '' ||
        scenario.entries.filter((entry) => entry.contentComments).length > 0
    );
    if (filteredScenarios) {
      const newSummary = filteredScenarios
        .map((scenario) => {
          const { subtitle, subtitleComments, entries } = scenario;
          let statement = [`${subtitle}:`];
          if (subtitleComments) {
            statement = [...statement, subtitleComments];
          }
          const flattenedEntries = entries
            .filter((entry) => entry.contentComments)
            .map((entry) => `${entry.content} - ${entry.contentComments}`)
            .join(' ');
          statement = [...statement, flattenedEntries];
          return statement.join(' ');
        })
        .join('\n\n');
      setSummary([header, newSummary, footer].filter((x) => x).join('\n\n'));
    }
  }, [scenarios, header, footer]);

  const handleContentCommentsChange = (newText, scenarioIndex, entryIndex) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].entries[entryIndex].contentComments = newText;
    setScenarios(newScenarios);
  };

  const handleSubtitleCommentsChange = (newText, scenariosIndex) => {
    const newScenarios = [...scenarios];
    newScenarios[scenariosIndex].subtitleComments = newText;
    setScenarios(newScenarios);
  };

  const handleDeleteNote = () => {
    dispatchNotes({
      type: 'REMOVE_NOTE',
      note_refId: parseInt(id, 10),
    });
    history.push('/notes');
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <InlineEditIdentifier text={refId} setText={setRefId} />
        <h3 style={{ color: 'var(--english-violet)', padding: '8px 12px' }}>
          {`(${title})`}
        </h3>
      </div>
      <div>
        <CommentHeader text={header} setText={setHeader} />
      </div>
      {scenarios.map((scenario, scenarioIndex) => {
        const { subtitle, subtitleComments, entries } = scenario;
        return (
          <div key={`scenario-${scenarioIndex * Date.now()}`}>
            <CommentSubtitle
              text={subtitleComments}
              subtitle={subtitle}
              setText={handleSubtitleCommentsChange}
              scenarioIndex={scenarioIndex}
              // deleteText={handleDeleteCurrentScenario}
            />
            <div>
              {entries.map((entry, entryIndex) => {
                const { content, contentComments } = entry;
                return (
                  <div key={`entry${entryIndex * Date.now()}`}>
                    <CommentContent
                      text={contentComments}
                      setText={handleContentCommentsChange}
                      content={content}
                      scenarioIndex={scenarioIndex}
                      entryIndex={entryIndex}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div>
        <CommentFooter text={footer} setText={setFooter} />
      </div>

      <textarea
        style={{
          height: '250px',
          width: '100%',
          marginTop: '12px',
          border: '1px solid green',
          boxSizing: 'border-box',
          overflowY: 'scroll',
        }}
        defaultValue={summary}
        readOnly
      />
      <form onSubmit={addNote}>
        <SaveButton isSaved={isSaved} />
      </form>
      <DeleteButton deleteAction={handleDeleteNote} type="note" />
    </div>
  );
};

export default EditNote;
