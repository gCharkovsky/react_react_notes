import axios from 'axios'

const URL = 'http://csc-notes.ru/';

export function force_reload() {
    document.dispatchEvent(new Event("notes-update"));
}

export function get_notes(from) {
    return axios.get(URL + "note?from=" + from);
}

export function get_note(id) {
    return axios.get(URL + "note/" + id);
}

export function add_note(note) {
    return axios.post(URL + "note/", note);
}

export function update_note(note) {
    return axios.post(URL + "note/" + note.id, note);
}

export function delete_note(id) {
    return axios.delete(URL + "note/" + id);

}