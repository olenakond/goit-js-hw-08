import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const setStorageData = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const getStorageData = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const savedCurrenttime = getStorageData('videoplayer-current-time');

if (savedCurrenttime) {
  player
  .setCurrentTime(savedCurrenttime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
}

const onPlay = function (data) {
  const currentTime = data.seconds;
  setStorageData('videoplayer-current-time', currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000));
