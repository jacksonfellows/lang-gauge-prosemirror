import {EditorState, Plugin} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {DOMParser} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {exampleSetup} from 'prosemirror-example-setup';
import './editor.css';

import {posTagger} from 'wink-pos-tagger';
let tagger = posTagger();

let state = EditorState.create({
    doc: DOMParser.fromSchema(schema).parse(document.getElementById('content')),
    plugins: exampleSetup({schema})
})
window.view = new EditorView(document.getElementById('editor'), {
    state,
    dispatchTransaction(transaction) {
        transaction.doc.descendants((node, parent) => {
            if (node.isText) {
                console.log(tagger.tagSentence(node.text));
            }
        });
        let newState = view.state.apply(transaction);
        view.updateState(newState);
    }
});