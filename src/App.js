import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";
import { useState } from "react";

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const starredEmailsCounter = emails.filter((email) => email.starred).length;
  const inboxCounter = emails.filter((email) => !email.read).length;

  function emailsToRender() {
    return hideRead ? emails.filter((email) => !email.read) : emails;
  }

  function toggledRead(targetEmail) {
    const updatedEmails = emails.map((email) => {
      if (email.id === targetEmail.id) {
        return { ...email, read: !email.read };
      }
      return email;
    });
    setEmails(updatedEmails);
  }

  function toggledStar(targetEmail) {
    const updatedEmails = emails.map((email) => {
      if (email.id === targetEmail.id) {
        return { ...email, starred: !email.starred };
      }
      return email;
    });
    setEmails(updatedEmails);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxCounter}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmailsCounter}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emailsToRender().map((email) => {
            return (
              <li
                key={email.id}
                className={`email ${email.read ? "read" : "unread"}`}
              >
                <input
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggledRead(email)}
                />
                <input
                  type="checkbox"
                  className="star-checkbox"
                  checked={email.starred}
                  onChange={() => toggledStar(email)}
                />
                <span>{email.sender}</span>
                <span className="title">{email.title}</span>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
