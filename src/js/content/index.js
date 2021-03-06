import handleProfile from './profile';
import handleSearch from './search';
import { showPictures, deanonymizeNames } from './modifySearch';
import { showPicture, deanonymizeNames as deanonymizeProfileName } from './modifyProfile';
import { setDisabled } from './disabled';

const run = () => {
  handleProfile();
  handleSearch();
};

chrome.storage.onChanged.addListener(({ disabled: { newValue: disabled } }) => {
  setDisabled(disabled);
  if (disabled) {
    showPicture();
    deanonymizeProfileName();

    showPictures();
    deanonymizeNames();
  } else {
    run();
  }
});

chrome.storage.local.get('disabled', ({ disabled }) => {
  setDisabled(disabled);
  if (!disabled) {
    run();
  }
});
