import fs = require('fs');
import mockanswer = require('vsts-task-lib/mock-answer');
import mockrun = require('vsts-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'copyfiles.js');
let runner: mockrun.TaskMockRunner = new mockrun.TaskMockRunner(taskPath);
runner.setInput('Contents', '**');
runner.setInput('TargetFolder', '/destDir');
runner.setInput('CleanTargetFolder', 'false');
runner.setInput('Overwrite', 'false');

// as a precaution, disable fs.chmodSync. it is the only fs function
// called by copyfiles and should not be called during this scenario.
fs.chmodSync = null;
runner.registerMock('fs', fs);

runner.run();
