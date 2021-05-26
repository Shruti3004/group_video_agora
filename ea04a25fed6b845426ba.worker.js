!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=165)}({0:function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return d}));var r=n(1),o=n(5),a=n(8),s=n(6),i=n(4);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function u(e,t){let n=e;if(Object(s.A)(e))return"string"===t?[]:[e.length];if(!Array.isArray(e))return[];const r=[];for(;Array.isArray(n)||Object(s.A)(n)&&"string"!==t;)r.push(n.length),n=n[0];return Array.isArray(e)&&Object(o.b)().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function e(t,n,r){if(r=r||[],!Array.isArray(t)&&!Object(s.A)(t))return void Object(s.b)(0===n.length,()=>`Element arr[${r.join("][")}] is a primitive, but should be an array/TypedArray of ${n[0]} elements`);Object(s.b)(n.length>0,()=>`Element arr[${r.join("][")}] should be a primitive, but is an array of ${t.length} elements`),Object(s.b)(t.length===n[0],()=>`Element arr[${r.join("][")}] should have ${n[0]} elements, but has ${t.length} elements`);const o=n.slice(1);for(let n=0;n<t.length;++n)e(t[n],o,r.concat(n))}(e,r,[]),r}function c(e,t,n,r){if("string_or_numeric"!==e){if(null==e)throw new Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw new Error(`Argument '${n}' passed to '${r}' must be ${e} tensor, but got ${t} tensor`)}}function l(e,t,n,o="numeric"){if(e instanceof a.a)return c(o,e.dtype,t,n),e;let l=Object(s.r)(e);if("string"!==l&&["bool","int32","float32"].indexOf(o)>=0&&(l=o),c(o,l,t,n),null==e||!Object(s.A)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){const r=null==e?"null":e.constructor.name;throw new Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${r}'`)}const d=u(e,l);Object(s.A)(e)||Array.isArray(e)||(e=[e]);const h="string"!==l?Object(i.toTypedArray)(e,l):Object(s.m)(e,[],!0);return r.a.makeTensor(h,d,l)}function d(e,t,n,r="numeric"){if(!Array.isArray(e))throw new Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,o)=>l(e,`${t}[${o}]`,n,r))}},1:function(e,t,n){"use strict";n.d(t,"b",(function(){return x})),n.d(t,"a",(function(){return y}));var r=n(17),o=n(5),a=n(15),s=n(3),i=n(11),u=n(4),c=n(6);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class l{constructor(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new h)}profileKernel(e,t,n){let r;const a=()=>{r=n()};let s;const i=u.now();if(this.backendTimer.timerAvailable())s=this.backendTimer.time(a);else{a();for(const e of r)e.dataSync();s=Promise.resolve({kernelMs:u.now()-i})}if(Object(o.b)().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let t=0;t<r.length;t++){const n=r[t];n.data().then(t=>{d(t,n.dtype,e)})}return{kernelName:e,outputs:r,inputs:t,timeMs:s.then(e=>e.kernelMs),extraInfo:s.then(e=>null!=e.getExtraProfileInfo?e.getExtraProfileInfo():"")}}logKernelProfile(e){const{kernelName:t,outputs:n,timeMs:r,inputs:o,extraInfo:a}=e;n.forEach(e=>{Promise.all([e.data(),r,a]).then(n=>{this.logger.logKernelProfile(t,e,n[0],n[1],o,n[2])})})}}function d(e,t,n){if("float32"!==t)return!1;for(let t=0;t<e.length;t++){const r=e[t];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}return!1}class h{logKernelProfile(e,t,n,r,o,a){const s="number"==typeof r?c.L(r+"ms",9):r.error,i=c.L(e,25),u=t.rank,l=t.size,d=c.L(t.shape.toString(),14);let h="";for(const e in o){const n=o[e];if(null!=n){const r=n.shape||t.shape,o=r.length;h+=`${e}: ${o}D ${o>0?r:""} `}}console.log(`%c${i}\t%c${s}\t%c${u}D ${d}\t%c${l}\t%c${h}\t%c${a}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var p=n(8),f=n(7);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function g(e){return null!=e.kernelName}class m{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(const e in this.registeredVariables)this.registeredVariables[e].dispose()}}class b{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new m}async ready(){if(null!=this.pendingBackendInit)return this.pendingBackendInit.then(()=>{});if(null!=this.backendInstance)return;const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const n=e[t];if(await this.initializeBackend(n).success)return void await this.setBackend(n)}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(null!=this.pendingBackendInit)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(null==this.backendInstance){const{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry)){if(!(e in this.registryFactory))return null;{const{asyncInit:t}=this.initializeBackend(e);if(t)return null}}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,n=1){return e in this.registryFactory?(console.warn(e+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[e]={factory:t,priority:n},!0)}async setBackend(e){if(null==this.registryFactory[e])throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,null==this.registry[e]){this.backendInstance=null;const{success:t,asyncInit:n}=this.initializeBackend(e);if(!(n?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new l(this.backendInstance),!0}setupRegisteredKernels(){Object(i.c)(this.backendName).forEach(e=>{null!=e.setupFunc&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Object(i.c)(e).forEach(t=>{null!=t.disposeFunc&&t.disposeFunc(this.registry[e])})}initializeBackend(e){const t=this.registryFactory[e];if(null==t)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{const n=t.factory();if(!n||n instanceof r.b||"function"!=typeof n.then)return this.registry[e]=n,{success:!0,asyncInit:!1};{const t=++this.pendingBackendInitId,r=n.then(n=>!(t<this.pendingBackendInitId)&&(this.registry[e]=n,this.pendingBackendInit=null,!0)).catch(n=>(t<this.pendingBackendInitId||(this.pendingBackendInit=null,console.warn(`Initialization of backend ${e} failed`),console.warn(n.stack||n.message)),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}}catch(t){return console.warn(`Initialization of backend ${e} failed`),console.warn(t.stack||t.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(e+" backend not found in registry");this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(0===Object.keys(this.registryFactory).length)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const n=e[t],{success:r,asyncInit:o}=this.initializeBackend(n);if(o||r)return{name:n,asyncInit:o}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){const n=this.state.tensorInfo.get(t),r=n.backend,o=this.readSync(t),a=r.refCount(t);r.disposeData(t,!0),n.backend=e,e.move(t,o,n.shape,n.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let n,r=null;if(null==t){if("function"!=typeof e)throw new Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=e}return this.scopedRun(()=>this.startScope(r),()=>this.endScope(n),()=>(n=t(),n instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(e,t,n){e();try{const e=n();return t(),e}catch(e){throw t(),e}}nextTensorId(){return b.nextTensorId++}nextVariableId(){return b.nextVariableId++}clone(e){const t=y.runKernel(s.ob,{x:e}),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],e=>({x:()=>{const t={x:e},n={dtype:"float32"};return y.runKernel(s.v,t,n)}}),[],{}),t}runKernel(e,t,n){if(!(null!=Object(i.b)(e,this.backendName)))throw new Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:n})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,n){const r=this.backend.numDataIds();let o=0;n.forEach(e=>{o+="complex64"===e.dtype?3:1});const a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],s=r-t-o-a;if(s>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${s} data ids) after running '${e}'`)}runKernelFunc(e){let t,n=[];const r=this.isTapeOn(),o=this.state.numBytes,a=this.state.numTensors;let s,u;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;const l=g(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(g(e)){const{kernelName:t,inputs:o,attrs:a}=e;null==this.backendName&&this.backend;const l=Object(i.b)(t,this.backendName);c.b(null!=l,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),s=()=>{const e=this.backend.numDataIds();u=l.kernelFunc({inputs:o,attrs:a,backend:this.backend});const s=Array.isArray(u)?u:[u];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,s);const i=s.map(e=>{if(null!=e.rank)return e;const{dataId:t,shape:n,dtype:r}=e;return this.makeTensorFromDataId(t,n,r)});if(r){const e=this.getTensorsForGradient(t,o,i);n=this.saveTensorsForBackwardMode(e)}return i}}else{const{forwardFunc:t}=e,o=e=>{r&&(n=e.map(e=>this.keep(this.clone(e))))};s=()=>{const e=this.backend.numDataIds();u=this.tidy(()=>t(this.backend,o));const n=Array.isArray(u)?u:[u];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(l,e,n),n}}const{inputs:d,attrs:h}=e,p=g(e)?null:e.backwardsFunc;let f;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{this.ENV.getBool("DEBUG")||this.state.profiling?(f=this.profiler.profileKernel(l,d,()=>s()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(f),t=f.outputs):t=s()}),r&&this.addTapeNode(l,d,t,p,n,h),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-o,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-a,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(d).map(e=>null!=d[e]?d[e].shape:null),outputShapes:t.map(e=>e.shape),kernelTimeMs:f.timeMs,extraInfo:f.extraInfo}),Array.isArray(u)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(e=>this.keep(this.clone(e)))}getTensorsForGradient(e,t,n){const r=Object(i.a)(e);if(null!=r){const e=r.inputsToSave||[],o=r.outputsToSave||[];let a;r.saveAllInputs?(c.b(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),a=Object.keys(t).map(e=>t[e])):a=e.map(e=>t[e]);const s=n.filter((e,t)=>o[t]);return a.concat(s)}return[]}makeTensor(e,t,n,r){if(null==e)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",r=r||this.backend;let o=e;"string"===n&&c.z(e[0])&&(o=e.map(e=>u.encodeString(e)));const a=r.write(o,t,n),s=new p.a(t,n,a,this.nextTensorId());if(this.trackTensor(s,r),"string"===n){const e=this.state.tensorInfo.get(a),t=Object(c.f)(o);this.state.numBytes+=t-e.bytes,e.bytes=t}return s}makeTensorFromDataId(e,t,n,r){n=n||"float32";const o=new p.a(t,n,e,this.nextTensorId());return this.trackTensor(o,r),o}makeVariable(e,t=!0,n,r){n=n||this.nextVariableId().toString(),null!=r&&r!==e.dtype&&(e=e.cast(r));const o=new p.c(e,t,n,this.nextTensorId());if(null!=this.state.registeredVariables[o.name])throw new Error(`Variable with name ${o.name} was already registered`);return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o}trackTensor(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;let n=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(n=e.size*c.g(e.dtype)),this.state.numBytes+=n,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:n})),e instanceof p.c||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;const t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){const t=e.size*c.g(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(const e in this.state.registeredVariables){const t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]}memory(){const e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;const t=this.state.numBytes,n=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n;for(const e of this.state.activeProfile.kernels)e.kernelTimeMs=await e.kernelTimeMs,e.extraInfo=await e.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&0===this.state.kernelDepth}addTapeNode(e,t,n,r,o,a){const s={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:o},u=Object(i.a)(e);null!=u&&(r=u.gradFunc),null!=r&&(s.gradient=e=>(e=e.map((e,t)=>{if(null==e){const e=n[t],r=c.F(e.size,e.dtype);return this.makeTensor(r,e.shape,e.dtype)}return e}),r(e.length>1?e:e[0],o,a))),this.state.activeTape.push(s)}keep(e){return e.kept=!0,e}startTape(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){const t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){const t=Object(f.a)(e),n=new Set(t.map(e=>e.id));for(let e=0;e<this.state.activeScope.track.length;e++){const t=this.state.activeScope.track[e];t.kept||n.has(t.id)||t.dispose()}const r=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{e.kept||e.scopeId!==r.id||this.track(e)})}gradients(e,t,n,r=!1){if(c.b(t.length>0,()=>"gradients() received an empty list of xs."),null!=n&&"float32"!==n.dtype)throw new Error(`dy must have 'float32' dtype, but has '${n.dtype}'`);const o=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));c.b(o instanceof p.a,()=>"The result y returned by f() must be a tensor.");const a=function(e,t,n){const r={},o={};for(let e=0;e<t.length;e++)r[t[e].id]=!0;for(let n=0;n<e.length;n++){const a=e[n],s=a.inputs;for(const e in s){const n=s[e];let i=!1;for(let e=0;e<t.length;e++)if(r[n.id]){a.outputs.forEach(e=>r[e.id]=!0),i=!0,o[a.id]=!0;break}if(i)break}}const a={};a[n.id]=!0;const s={};for(let t=e.length-1;t>=0;t--){const n=e[t],r=n.inputs;for(let e=0;e<n.outputs.length;e++)if(a[n.outputs[e].id]){for(const e in r)a[r[e].id]=!0,s[n.id]=!0;break}}const i=[];for(let t=0;t<e.length;t++){const n=e[t];if(o[n.id]&&s[n.id]){const e={};for(const t in n.inputs){const o=n.inputs[t];r[o.id]&&(e[t]=o)}const t=Object.assign({},n);t.inputs=e,t.outputs=n.outputs,i.push(t)}}return i}(this.state.activeTape,t,o);if(!r&&0===a.length&&t.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const e={};e[o.id]=null==n?function(e){const t=Object(c.D)(Object(c.O)(e),"float32");return y.makeTensor(t,e,"float32")}(o.shape):n,function(e,t,n,r){for(let o=t.length-1;o>=0;o--){const a=t[o],s=[];if(a.outputs.forEach(t=>{const n=e[t.id];null!=n?s.push(n):s.push(null)}),null==a.gradient)throw new Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);const i=a.gradient(s);for(const t in a.inputs){if(!(t in i))throw new Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(i)}.`);const o=n(()=>i[t]());if("float32"!==o.dtype)throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${o.dtype}'`);const s=a.inputs[t];if(!c.a(o.shape,s.shape))throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${t}' has shape '${o.shape}', which does not match the shape of the input '${s.shape}'`);if(null==e[s.id])e[s.id]=o;else{const t=e[s.id];e[s.id]=r(t,o),t.dispose()}}}}(e,a,e=>this.tidy(e),v);const r=t.map(t=>e[t.id]);return 0===this.state.gradientDepth&&(this.state.activeTape.forEach(e=>{for(const t of e.saved)t.dispose()}),this.state.activeTape=null),{value:o,grads:r}})}customGrad(e){return c.b(c.u(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{let n;c.b(t.every(e=>e instanceof p.a),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");const r={};t.forEach((e,t)=>{r[t]=e});return this.runKernelFunc({forwardFunc:(r,o)=>(n=e(...t,o),c.b(n.value instanceof p.a,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),c.b(c.u(n.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),n.value),backwardsFunc:(e,r)=>{const o=n.gradFunc(e,r),a=Array.isArray(o)?o:[o];c.b(a.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),c.b(a.every(e=>e instanceof p.a),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const s={};return a.forEach((e,t)=>{s[t]=()=>e}),s},inputs:r})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}async time(e){const t=Object(u.now)(),n=await this.backend.time(e);return n.wallMs=Object(u.now)()-t,n}track(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new m;for(const e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}function x(){const e=Object(a.b)();if(null==e._tfengine){const t=new o.a(e);e._tfengine=new b(t)}return Object(o.c)(e._tfengine.ENV),Object(p.f)(()=>e._tfengine),e._tfengine}b.nextTensorId=0,b.nextVariableId=0;const y=x();function v(e,t){const n={a:e,b:t};return y.runKernel(s.d,n)}},10:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(1),o=n(3),a=n(0),s=n(6),i=n(2);const u=Object(i.a)({complex_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=Object(a.a)(e,"real","complex"),i=Object(a.a)(t,"imag","complex");s.e(n.shape,i.shape,`real and imag shapes, ${n.shape} and ${i.shape}, must match in call to tf.complex().`);const u={real:n,imag:i};return r.a.runKernel(o.y,u)}})},11:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return c}));n(5);var r=n(15);
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const o=Object(r.a)("kernelRegistry",()=>new Map),a=Object(r.a)("gradRegistry",()=>new Map);function s(e,t){const n=l(e,t);return o.get(n)}function i(e){return a.get(e)}function u(e){const t=o.entries(),n=[];for(;;){const{done:r,value:o}=t.next();if(r)break;const[a,s]=o,[i]=a.split("_");i===e&&n.push(s)}return n}function c(e){const{kernelName:t,backendName:n}=e,r=l(t,n);o.has(r)&&console.warn(`The kernel '${t}' for backend '${n}' is already registered`),o.set(r,e)}function l(e,t){return`${t}_${e}`}},12:function(e,t,n){"use strict";
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var r,o,a,s,i;n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return l})),function(e){e.R0="R0",e.R1="R1",e.R2="R2",e.R3="R3",e.R4="R4",e.R5="R5",e.R6="R6"}(r||(r={})),function(e){e.float32="float32",e.int32="int32",e.bool="int32",e.complex64="complex64"}(o||(o={})),function(e){e.float32="float32",e.int32="int32",e.bool="bool",e.complex64="complex64"}(a||(a={})),function(e){e.float32="float32",e.int32="float32",e.bool="float32",e.complex64="complex64"}(s||(s={})),function(e){e.float32="complex64",e.int32="complex64",e.bool="complex64",e.complex64="complex64"}(i||(i={}));const u={float32:s,int32:o,bool:a,complex64:i};function c(e,t){if("string"===e||"string"===t){if("string"===e&&"string"===t)return"string";throw new Error(`Can not upcast ${e} with ${t}`)}return u[e][t]}function l(e){return c(e,"int32")}},13:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(0),o=n(14);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function a(e,t,n){const a=Object(r.c)(e,n);return Object(o.a)(e,t,a,n)}},14:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(1),o=n(6),a=n(4);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function s(e,t,n,s){if(null==s&&(s=Object(o.r)(e)),"complex64"===s)throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!Object(o.A)(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){Object(o.c)(t);const e=Object(o.O)(t),r=Object(o.O)(n);Object(o.b)(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let e=0;e<n.length;++e){const r=n[e],a=e!==n.length-1||r!==Object(o.O)(t.slice(e));Object(o.b)(n[e]===t[e]||!a,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return Object(o.A)(e)||Array.isArray(e)||(e=[e]),t=t||n,e="string"!==s?Object(a.toTypedArray)(e,s):Object(o.m)(e,[],!0),r.a.makeTensor(e,t,s)}},15:function(e,t,n){"use strict";(function(e,r){
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
let o;function a(){if(null==o){let t;if("undefined"!=typeof window)t=window;else if(void 0!==e)t=e;else if(void 0!==r)t=r;else{if("undefined"==typeof self)throw new Error("Could not find a global object");t=self}o=t}return o}function s(e,t){const n=function(){const e=a();return null==e._tfGlobals&&(e._tfGlobals=new Map),e._tfGlobals}();if(n.has(e))return n.get(e);{const r=t();return n.set(e,r),n.get(e)}}n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return s}))}).call(this,n(21),n(20))},158:function(e,t,n){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var r=n(159),o=n(160),a=n(161);function s(){return u.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(e,t){if(s()<t)throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=u.prototype:(null===e&&(e=new u(t)),e.length=t),e}function u(e,t,n){if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))return new u(e,t,n);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return d(this,e)}return c(this,e,t,n)}function c(e,t,n,r){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,n,r){if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");t=void 0===n&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,n):new Uint8Array(t,n,r);u.TYPED_ARRAY_SUPPORT?(e=t).__proto__=u.prototype:e=h(e,t);return e}(e,t,n,r):"string"==typeof t?function(e,t,n){"string"==typeof n&&""!==n||(n="utf8");if(!u.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|f(t,n),o=(e=i(e,r)).write(t,n);o!==r&&(e=e.slice(0,o));return e}(e,t,n):function(e,t){if(u.isBuffer(t)){var n=0|p(t.length);return 0===(e=i(e,n)).length||t.copy(e,0,0,n),e}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(r=t.length)!=r?i(e,0):h(e,t);if("Buffer"===t.type&&a(t.data))return h(e,t.data)}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function l(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function d(e,t){if(l(t),e=i(e,t<0?0:0|p(t)),!u.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function h(e,t){var n=t.length<0?0:0|p(t.length);e=i(e,n);for(var r=0;r<n;r+=1)e[r]=255&t[r];return e}function p(e){if(e>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|e}function f(e,t){if(u.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return j(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return U(e).length;default:if(r)return j(e).length;t=(""+t).toLowerCase(),r=!0}}function g(e,t,n){var r=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return S(this,t,n);case"utf8":case"utf-8":return E(this,t,n);case"ascii":return R(this,t,n);case"latin1":case"binary":return O(this,t,n);case"base64":return k(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function m(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function b(e,t,n,r,o){if(0===e.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(o)return-1;n=e.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof t&&(t=u.from(t,r)),u.isBuffer(t))return 0===t.length?-1:x(e,t,n,r,o);if("number"==typeof t)return t&=255,u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):x(e,[t],n,r,o);throw new TypeError("val must be string, number or Buffer")}function x(e,t,n,r,o){var a,s=1,i=e.length,u=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;s=2,i/=2,u/=2,n/=2}function c(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(o){var l=-1;for(a=n;a<i;a++)if(c(e,a)===c(t,-1===l?0:a-l)){if(-1===l&&(l=a),a-l+1===u)return l*s}else-1!==l&&(a-=a-l),l=-1}else for(n+u>i&&(n=i-u),a=n;a>=0;a--){for(var d=!0,h=0;h<u;h++)if(c(e,a+h)!==c(t,h)){d=!1;break}if(d)return a}return-1}function y(e,t,n,r){n=Number(n)||0;var o=e.length-n;r?(r=Number(r))>o&&(r=o):r=o;var a=t.length;if(a%2!=0)throw new TypeError("Invalid hex string");r>a/2&&(r=a/2);for(var s=0;s<r;++s){var i=parseInt(t.substr(2*s,2),16);if(isNaN(i))return s;e[n+s]=i}return s}function v(e,t,n,r){return W(j(t,e.length-n),e,n,r)}function w(e,t,n,r){return W(function(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}(t),e,n,r)}function C(e,t,n,r){return w(e,t,n,r)}function $(e,t,n,r){return W(U(t),e,n,r)}function I(e,t,n,r){return W(function(e,t){for(var n,r,o,a=[],s=0;s<e.length&&!((t-=2)<0);++s)n=e.charCodeAt(s),r=n>>8,o=n%256,a.push(o),a.push(r);return a}(t,e.length-n),e,n,r)}function k(e,t,n){return 0===t&&n===e.length?r.fromByteArray(e):r.fromByteArray(e.slice(t,n))}function E(e,t,n){n=Math.min(e.length,n);for(var r=[],o=t;o<n;){var a,s,i,u,c=e[o],l=null,d=c>239?4:c>223?3:c>191?2:1;if(o+d<=n)switch(d){case 1:c<128&&(l=c);break;case 2:128==(192&(a=e[o+1]))&&(u=(31&c)<<6|63&a)>127&&(l=u);break;case 3:a=e[o+1],s=e[o+2],128==(192&a)&&128==(192&s)&&(u=(15&c)<<12|(63&a)<<6|63&s)>2047&&(u<55296||u>57343)&&(l=u);break;case 4:a=e[o+1],s=e[o+2],i=e[o+3],128==(192&a)&&128==(192&s)&&128==(192&i)&&(u=(15&c)<<18|(63&a)<<12|(63&s)<<6|63&i)>65535&&u<1114112&&(l=u)}null===l?(l=65533,d=1):l>65535&&(l-=65536,r.push(l>>>10&1023|55296),l=56320|1023&l),r.push(l),o+=d}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e);var n="",r=0;for(;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=4096));return n}(r)}t.Buffer=u,t.SlowBuffer=function(e){+e!=e&&(e=0);return u.alloc(+e)},t.INSPECT_MAX_BYTES=50,u.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),t.kMaxLength=s(),u.poolSize=8192,u._augment=function(e){return e.__proto__=u.prototype,e},u.from=function(e,t,n){return c(null,e,t,n)},u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0})),u.alloc=function(e,t,n){return function(e,t,n,r){return l(t),t<=0?i(e,t):void 0!==n?"string"==typeof r?i(e,t).fill(n,r):i(e,t).fill(n):i(e,t)}(null,e,t,n)},u.allocUnsafe=function(e){return d(null,e)},u.allocUnsafeSlow=function(e){return d(null,e)},u.isBuffer=function(e){return!(null==e||!e._isBuffer)},u.compare=function(e,t){if(!u.isBuffer(e)||!u.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,o=0,a=Math.min(n,r);o<a;++o)if(e[o]!==t[o]){n=e[o],r=t[o];break}return n<r?-1:r<n?1:0},u.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(e,t){if(!a(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return u.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var r=u.allocUnsafe(t),o=0;for(n=0;n<e.length;++n){var s=e[n];if(!u.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(r,o),o+=s.length}return r},u.byteLength=f,u.prototype._isBuffer=!0,u.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)m(this,t,t+1);return this},u.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)m(this,t,t+3),m(this,t+1,t+2);return this},u.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)m(this,t,t+7),m(this,t+1,t+6),m(this,t+2,t+5),m(this,t+3,t+4);return this},u.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?E(this,0,e):g.apply(this,arguments)},u.prototype.equals=function(e){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===u.compare(this,e)},u.prototype.inspect=function(){var e="",n=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(e+=" ... ")),"<Buffer "+e+">"},u.prototype.compare=function(e,t,n,r,o){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),t<0||n>e.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&t>=n)return 0;if(r>=o)return-1;if(t>=n)return 1;if(this===e)return 0;for(var a=(o>>>=0)-(r>>>=0),s=(n>>>=0)-(t>>>=0),i=Math.min(a,s),c=this.slice(r,o),l=e.slice(t,n),d=0;d<i;++d)if(c[d]!==l[d]){a=c[d],s=l[d];break}return a<s?-1:s<a?1:0},u.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},u.prototype.indexOf=function(e,t,n){return b(this,e,t,n,!0)},u.prototype.lastIndexOf=function(e,t,n){return b(this,e,t,n,!1)},u.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-t;if((void 0===n||n>o)&&(n=o),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var a=!1;;)switch(r){case"hex":return y(this,e,t,n);case"utf8":case"utf-8":return v(this,e,t,n);case"ascii":return w(this,e,t,n);case"latin1":case"binary":return C(this,e,t,n);case"base64":return $(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,e,t,n);default:if(a)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),a=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function R(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(127&e[o]);return r}function O(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(e[o]);return r}function S(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",a=t;a<n;++a)o+=M(e[a]);return o}function T(e,t,n){for(var r=e.slice(t,n),o="",a=0;a<r.length;a+=2)o+=String.fromCharCode(r[a]+256*r[a+1]);return o}function A(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function N(e,t,n,r,o,a){if(!u.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<a)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function F(e,t,n,r){t<0&&(t=65535+t+1);for(var o=0,a=Math.min(e.length-n,2);o<a;++o)e[n+o]=(t&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function _(e,t,n,r){t<0&&(t=4294967295+t+1);for(var o=0,a=Math.min(e.length-n,4);o<a;++o)e[n+o]=t>>>8*(r?o:3-o)&255}function D(e,t,n,r,o,a){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function L(e,t,n,r,a){return a||D(e,0,n,4),o.write(e,t,n,r,23,4),n+4}function P(e,t,n,r,a){return a||D(e,0,n,8),o.write(e,t,n,r,52,8),n+8}u.prototype.slice=function(e,t){var n,r=this.length;if((e=~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e),u.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,t)).__proto__=u.prototype;else{var o=t-e;n=new u(o,void 0);for(var a=0;a<o;++a)n[a]=this[a+e]}return n},u.prototype.readUIntLE=function(e,t,n){e|=0,t|=0,n||A(e,t,this.length);for(var r=this[e],o=1,a=0;++a<t&&(o*=256);)r+=this[e+a]*o;return r},u.prototype.readUIntBE=function(e,t,n){e|=0,t|=0,n||A(e,t,this.length);for(var r=this[e+--t],o=1;t>0&&(o*=256);)r+=this[e+--t]*o;return r},u.prototype.readUInt8=function(e,t){return t||A(e,1,this.length),this[e]},u.prototype.readUInt16LE=function(e,t){return t||A(e,2,this.length),this[e]|this[e+1]<<8},u.prototype.readUInt16BE=function(e,t){return t||A(e,2,this.length),this[e]<<8|this[e+1]},u.prototype.readUInt32LE=function(e,t){return t||A(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},u.prototype.readUInt32BE=function(e,t){return t||A(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},u.prototype.readIntLE=function(e,t,n){e|=0,t|=0,n||A(e,t,this.length);for(var r=this[e],o=1,a=0;++a<t&&(o*=256);)r+=this[e+a]*o;return r>=(o*=128)&&(r-=Math.pow(2,8*t)),r},u.prototype.readIntBE=function(e,t,n){e|=0,t|=0,n||A(e,t,this.length);for(var r=t,o=1,a=this[e+--r];r>0&&(o*=256);)a+=this[e+--r]*o;return a>=(o*=128)&&(a-=Math.pow(2,8*t)),a},u.prototype.readInt8=function(e,t){return t||A(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},u.prototype.readInt16LE=function(e,t){t||A(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt16BE=function(e,t){t||A(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt32LE=function(e,t){return t||A(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},u.prototype.readInt32BE=function(e,t){return t||A(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},u.prototype.readFloatLE=function(e,t){return t||A(e,4,this.length),o.read(this,e,!0,23,4)},u.prototype.readFloatBE=function(e,t){return t||A(e,4,this.length),o.read(this,e,!1,23,4)},u.prototype.readDoubleLE=function(e,t){return t||A(e,8,this.length),o.read(this,e,!0,52,8)},u.prototype.readDoubleBE=function(e,t){return t||A(e,8,this.length),o.read(this,e,!1,52,8)},u.prototype.writeUIntLE=function(e,t,n,r){(e=+e,t|=0,n|=0,r)||N(this,e,t,n,Math.pow(2,8*n)-1,0);var o=1,a=0;for(this[t]=255&e;++a<n&&(o*=256);)this[t+a]=e/o&255;return t+n},u.prototype.writeUIntBE=function(e,t,n,r){(e=+e,t|=0,n|=0,r)||N(this,e,t,n,Math.pow(2,8*n)-1,0);var o=n-1,a=1;for(this[t+o]=255&e;--o>=0&&(a*=256);)this[t+o]=e/a&255;return t+n},u.prototype.writeUInt8=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,1,255,0),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},u.prototype.writeUInt16LE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):F(this,e,t,!0),t+2},u.prototype.writeUInt16BE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):F(this,e,t,!1),t+2},u.prototype.writeUInt32LE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):_(this,e,t,!0),t+4},u.prototype.writeUInt32BE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):_(this,e,t,!1),t+4},u.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t|=0,!r){var o=Math.pow(2,8*n-1);N(this,e,t,n,o-1,-o)}var a=0,s=1,i=0;for(this[t]=255&e;++a<n&&(s*=256);)e<0&&0===i&&0!==this[t+a-1]&&(i=1),this[t+a]=(e/s>>0)-i&255;return t+n},u.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t|=0,!r){var o=Math.pow(2,8*n-1);N(this,e,t,n,o-1,-o)}var a=n-1,s=1,i=0;for(this[t+a]=255&e;--a>=0&&(s*=256);)e<0&&0===i&&0!==this[t+a+1]&&(i=1),this[t+a]=(e/s>>0)-i&255;return t+n},u.prototype.writeInt8=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,1,127,-128),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},u.prototype.writeInt16LE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):F(this,e,t,!0),t+2},u.prototype.writeInt16BE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):F(this,e,t,!1),t+2},u.prototype.writeInt32LE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,4,2147483647,-2147483648),u.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):_(this,e,t,!0),t+4},u.prototype.writeInt32BE=function(e,t,n){return e=+e,t|=0,n||N(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),u.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):_(this,e,t,!1),t+4},u.prototype.writeFloatLE=function(e,t,n){return L(this,e,t,!0,n)},u.prototype.writeFloatBE=function(e,t,n){return L(this,e,t,!1,n)},u.prototype.writeDoubleLE=function(e,t,n){return P(this,e,t,!0,n)},u.prototype.writeDoubleBE=function(e,t,n){return P(this,e,t,!1,n)},u.prototype.copy=function(e,t,n,r){if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var o,a=r-n;if(this===e&&n<t&&t<r)for(o=a-1;o>=0;--o)e[o+t]=this[o+n];else if(a<1e3||!u.TYPED_ARRAY_SUPPORT)for(o=0;o<a;++o)e[o+t]=this[o+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+a),t);return a},u.prototype.fill=function(e,t,n,r){if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===e.length){var o=e.charCodeAt(0);o<256&&(e=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!u.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var a;if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(a=t;a<n;++a)this[a]=e;else{var s=u.isBuffer(e)?e:j(new u(e,r).toString()),i=s.length;for(a=0;a<n-t;++a)this[a+t]=s[a%i]}return this};var B=/[^+\/0-9A-Za-z-_]/g;function M(e){return e<16?"0"+e.toString(16):e.toString(16)}function j(e,t){var n;t=t||1/0;for(var r=e.length,o=null,a=[],s=0;s<r;++s){if((n=e.charCodeAt(s))>55295&&n<57344){if(!o){if(n>56319){(t-=3)>-1&&a.push(239,191,189);continue}if(s+1===r){(t-=3)>-1&&a.push(239,191,189);continue}o=n;continue}if(n<56320){(t-=3)>-1&&a.push(239,191,189),o=n;continue}n=65536+(o-55296<<10|n-56320)}else o&&(t-=3)>-1&&a.push(239,191,189);if(o=null,n<128){if((t-=1)<0)break;a.push(n)}else if(n<2048){if((t-=2)<0)break;a.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;a.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;a.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return a}function U(e){return r.toByteArray(function(e){if((e=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(B,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);++o)t[o+n]=e[o];return o}}).call(this,n(21))},159:function(e,t,n){"use strict";t.byteLength=function(e){var t=c(e),n=t[0],r=t[1];return 3*(n+r)/4-r},t.toByteArray=function(e){var t,n,r=c(e),s=r[0],i=r[1],u=new a(function(e,t,n){return 3*(t+n)/4-n}(0,s,i)),l=0,d=i>0?s-4:s;for(n=0;n<d;n+=4)t=o[e.charCodeAt(n)]<<18|o[e.charCodeAt(n+1)]<<12|o[e.charCodeAt(n+2)]<<6|o[e.charCodeAt(n+3)],u[l++]=t>>16&255,u[l++]=t>>8&255,u[l++]=255&t;2===i&&(t=o[e.charCodeAt(n)]<<2|o[e.charCodeAt(n+1)]>>4,u[l++]=255&t);1===i&&(t=o[e.charCodeAt(n)]<<10|o[e.charCodeAt(n+1)]<<4|o[e.charCodeAt(n+2)]>>2,u[l++]=t>>8&255,u[l++]=255&t);return u},t.fromByteArray=function(e){for(var t,n=e.length,o=n%3,a=[],s=0,i=n-o;s<i;s+=16383)a.push(l(e,s,s+16383>i?i:s+16383));1===o?(t=e[n-1],a.push(r[t>>2]+r[t<<4&63]+"==")):2===o&&(t=(e[n-2]<<8)+e[n-1],a.push(r[t>>10]+r[t>>4&63]+r[t<<2&63]+"="));return a.join("")};for(var r=[],o=[],a="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,u=s.length;i<u;++i)r[i]=s[i],o[s.charCodeAt(i)]=i;function c(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");return-1===n&&(n=t),[n,n===t?0:4-n%4]}function l(e,t,n){for(var o,a,s=[],i=t;i<n;i+=3)o=(e[i]<<16&16711680)+(e[i+1]<<8&65280)+(255&e[i+2]),s.push(r[(a=o)>>18&63]+r[a>>12&63]+r[a>>6&63]+r[63&a]);return s.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},16:function(e,t,n){"use strict";(function(e){n(1);var t=n(19),r=n(5);
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const o=Object(r.b)();o.registerFlag("DEBUG",()=>!1,e=>{e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),o.registerFlag("IS_BROWSER",()=>t.isBrowser()),o.registerFlag("IS_NODE",()=>void 0!==e&&void 0!==e.versions&&void 0!==e.versions.node),o.registerFlag("IS_CHROME",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),o.registerFlag("PROD",()=>!1),o.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>o.getBool("DEBUG")),o.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),o.registerFlag("IS_TEST",()=>!1),o.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>!0),o.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1)}).call(this,n(20))},160:function(e,t){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
t.read=function(e,t,n,r,o){var a,s,i=8*o-r-1,u=(1<<i)-1,c=u>>1,l=-7,d=n?o-1:0,h=n?-1:1,p=e[t+d];for(d+=h,a=p&(1<<-l)-1,p>>=-l,l+=i;l>0;a=256*a+e[t+d],d+=h,l-=8);for(s=a&(1<<-l)-1,a>>=-l,l+=r;l>0;s=256*s+e[t+d],d+=h,l-=8);if(0===a)a=1-c;else{if(a===u)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,r),a-=c}return(p?-1:1)*s*Math.pow(2,a-r)},t.write=function(e,t,n,r,o,a){var s,i,u,c=8*a-o-1,l=(1<<c)-1,d=l>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:a-1,f=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(i=isNaN(t)?1:0,s=l):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),(t+=s+d>=1?h/u:h*Math.pow(2,1-d))*u>=2&&(s++,u/=2),s+d>=l?(i=0,s=l):s+d>=1?(i=(t*u-1)*Math.pow(2,o),s+=d):(i=t*Math.pow(2,d-1)*Math.pow(2,o),s=0));o>=8;e[n+p]=255&i,p+=f,i/=256,o-=8);for(s=s<<o|i,c+=o;c>0;e[n+p]=255&s,p+=f,s/=256,c-=8);e[n+p-f]|=128*g}},161:function(e,t){var n={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==n.call(e)}},162:function(e,t,n){"use strict";(function(e){var t=n(5);
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const r=()=>n(163);let o;class a{constructor(){this.util=n(164),this.textEncoder=new this.util.TextEncoder}fetch(e,n){return null!=Object(t.b)().global.fetch?Object(t.b)().global.fetch(e,n):(null==o&&(o=r()),o(e,n))}now(){const t=e.hrtime();return 1e3*t[0]+t[1]/1e6}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw new Error("Node built-in encoder only supports utf-8, but got "+t);return this.textEncoder.encode(e)}decode(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)}}Object(t.b)().get("IS_NODE")&&Object(t.b)().setPlatform("node",new a)}).call(this,n(20))},163:function(e,t){},164:function(e,t){},165:function(e,t,n){"use strict";n.r(t),n.d(t,"getAnglesInfo",(function(){return Oh}));var r={};n.r(r),n.d(r,"assertParamsValid",(function(){return X})),n.d(r,"maskToAxes",(function(){return K})),n.d(r,"computeOutShape",(function(){return q})),n.d(r,"stridesWithElidedDims",(function(){return Y})),n.d(r,"getNormalizedAxes",(function(){return J})),n.d(r,"startIndicesWithElidedDims",(function(){return ee})),n.d(r,"stopIndicesWithElidedDims",(function(){return te})),n.d(r,"stridesForAxis",(function(){return ne})),n.d(r,"startForAxis",(function(){return re})),n.d(r,"stopForAxis",(function(){return oe})),n.d(r,"isSliceContinous",(function(){return ae})),n.d(r,"computeFlatOffset",(function(){return se})),n.d(r,"parseSliceParams",(function(){return ie})),n.d(r,"sliceInfo",(function(){return ue}));var o={};n.r(o),n.d(o,"segOpComputeOptimalWindowSize",(function(){return ar})),n.d(o,"computeOutShape",(function(){return sr})),n.d(o,"collectGatherOpShapeInfo",(function(){return ir}));var a={};n.r(a),n.d(a,"axesAreInnerMostDims",(function(){return gt})),n.d(a,"combineLocations",(function(){return mt})),n.d(a,"computeOutAndReduceShapes",(function(){return bt})),n.d(a,"expandShapeToKeepDim",(function(){return xt})),n.d(a,"assertAxesAreInnerMostDims",(function(){return yt})),n.d(a,"getAxesPermutation",(function(){return vt})),n.d(a,"getUndoAxesPermutation",(function(){return wt})),n.d(a,"getInnerMostAxes",(function(){return Ct})),n.d(a,"getBroadcastDims",(function(){return et})),n.d(a,"getReductionAxes",(function(){return tt})),n.d(a,"assertAndGetBroadcastShape",(function(){return nt})),n.d(a,"assertParamsConsistent",(function(){return qt})),n.d(a,"computeOutShape",(function(){return Yt})),n.d(a,"computeDilation2DInfo",(function(){return Qt})),n.d(a,"computePool2DInfo",(function(){return Zt})),n.d(a,"computePool3DInfo",(function(){return Jt})),n.d(a,"computeConv2DInfo",(function(){return en})),n.d(a,"computeConv3DInfo",(function(){return tn})),n.d(a,"computeDefaultPad",(function(){return nn})),n.d(a,"tupleValuesAreOne",(function(){return un})),n.d(a,"eitherStridesOrDilationsAreOne",(function(){return cn})),n.d(a,"convertConv2DDataFormat",(function(){return ln})),n.d(a,"getFusedDyActivation",(function(){return bn})),n.d(a,"getFusedBiasGradient",(function(){return xn})),n.d(a,"applyActivation",(function(){return yn})),n.d(a,"shouldFuse",(function(){return vn})),n.d(a,"PARALLELIZE_THRESHOLD",(function(){return wn})),n.d(a,"computeOptimalWindowSize",(function(){return Cn})),n.d(a,"slice_util",(function(){return r})),n.d(a,"upcastType",(function(){return le.b})),n.d(a,"getImageCenter",(function(){return $n})),n.d(a,"getReshaped",(function(){return In})),n.d(a,"getPermuted",(function(){return kn})),n.d(a,"getReshapedPermuted",(function(){return En})),n.d(a,"getSliceBeginCoords",(function(){return Rn})),n.d(a,"getSliceSize",(function(){return On})),n.d(a,"prepareAndValidate",(function(){return Sn})),n.d(a,"validateUpdateShape",(function(){return Tn})),n.d(a,"validateInput",(function(){return An})),n.d(a,"calculateShapes",(function(){return Nn})),n.d(a,"SELU_SCALEALPHA",(function(){return Fn})),n.d(a,"SELU_SCALE",(function(){return _n})),n.d(a,"ERF_P",(function(){return Dn})),n.d(a,"ERF_A1",(function(){return Ln})),n.d(a,"ERF_A2",(function(){return Pn})),n.d(a,"ERF_A3",(function(){return Bn})),n.d(a,"ERF_A4",(function(){return Mn})),n.d(a,"ERF_A5",(function(){return jn})),n.d(a,"warn",(function(){return Un})),n.d(a,"log",(function(){return Wn})),n.d(a,"mergeRealAndImagArrays",(function(){return Vn})),n.d(a,"splitRealAndImagArrays",(function(){return zn})),n.d(a,"complexWithEvenIndex",(function(){return Gn})),n.d(a,"complexWithOddIndex",(function(){return Hn})),n.d(a,"getComplexWithIndex",(function(){return Xn})),n.d(a,"assignToTypedArray",(function(){return Kn})),n.d(a,"exponents",(function(){return qn})),n.d(a,"exponent",(function(){return Yn})),n.d(a,"decodeEinsumEquation",(function(){return Zn})),n.d(a,"getEinsumPermutation",(function(){return Jn})),n.d(a,"checkEinsumDimSizes",(function(){return er})),n.d(a,"getEinsumComputePath",(function(){return tr})),n.d(a,"isIdentityPermutation",(function(){return nr})),n.d(a,"prepareSplitSize",(function(){return or})),n.d(a,"segment_util",(function(){return o})),n.d(a,"fromUint8ToStringArray",(function(){return ur})),n.d(a,"fromStringArrayToUint8",(function(){return cr}));var s={};n.r(s),n.d(s,"nonMaxSuppressionV3Impl",(function(){return He})),n.d(s,"nonMaxSuppressionV4Impl",(function(){return Xe})),n.d(s,"nonMaxSuppressionV5Impl",(function(){return Ke})),n.d(s,"whereImpl",(function(){return dr}));var i={};n.r(i),n.d(i,"simpleAbsImpl",(function(){return Fo})),n.d(i,"addImpl",(function(){return Uo})),n.d(i,"bincountImpl",(function(){return Vo})),n.d(i,"bincountReduceImpl",(function(){return zo})),n.d(i,"ceilImpl",(function(){return Xo})),n.d(i,"concatImpl",(function(){return Ko})),n.d(i,"expImpl",(function(){return qo})),n.d(i,"expm1Impl",(function(){return Yo})),n.d(i,"floorImpl",(function(){return Qo})),n.d(i,"gatherV2Impl",(function(){return Zo})),n.d(i,"greaterImpl",(function(){return Jo})),n.d(i,"lessImpl",(function(){return ea})),n.d(i,"linSpaceImpl",(function(){return ta})),n.d(i,"logImpl",(function(){return na})),n.d(i,"maxImpl",(function(){return ra})),n.d(i,"maximumImpl",(function(){return oa})),n.d(i,"minimumImpl",(function(){return aa})),n.d(i,"multiplyImpl",(function(){return sa})),n.d(i,"negImpl",(function(){return ua})),n.d(i,"notEqualImpl",(function(){return ca})),n.d(i,"prodImpl",(function(){return da})),n.d(i,"rangeImpl",(function(){return ha})),n.d(i,"rsqrtImpl",(function(){return pa})),n.d(i,"sliceImpl",(function(){return fa})),n.d(i,"sparseFillEmptyRowsImpl",(function(){return ga})),n.d(i,"sparseReshapeImpl",(function(){return ma})),n.d(i,"squaredDifferenceImpl",(function(){return ba})),n.d(i,"stridedSliceImpl",(function(){return xa})),n.d(i,"subImpl",(function(){return ya})),n.d(i,"tileImpl",(function(){return wa})),n.d(i,"topKImpl",(function(){return Ca})),n.d(i,"transposeImpl",(function(){return la})),n.d(i,"uniqueImpl",(function(){return $a}));var u=n(1),c=(n(16),n(5)),l=n(9);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class d{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return null==d.instance&&(d.instance=new d),d.instance}static registerSaveRouter(e){d.getInstance().saveRouters.push(e)}static registerLoadRouter(e){d.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return d.getHandlers(e,"save")}static getLoadHandlers(e,t){return d.getHandlers(e,"load",t)}static getHandlers(e,t,n){const r=[];return("load"===t?d.getInstance().loadRouters:d.getInstance().saveRouters).forEach(t=>{const o=t(e,n);null!==o&&r.push(o)}),r}}function h(){if(!Object(c.b)().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw new Error("The current browser does not appear to support IndexedDB.");return t}function p(e){const t=e.result;t.createObjectStore("models_store",{keyPath:"modelPath"}),t.createObjectStore("model_info_store",{keyPath:"modelPath"})}class f{constructor(e){if(this.indexedDB=h(),null==e||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,n)=>{const r=this.indexedDB.open("tensorflowjs",1);r.onupgradeneeded=()=>p(r),r.onsuccess=()=>{const o=r.result;if(null==t){const t=o.transaction("models_store","readonly"),r=t.objectStore("models_store").get(this.modelPath);r.onsuccess=()=>{if(null==r.result)return o.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(r.result.modelArtifacts)},r.onerror=e=>(o.close(),n(r.error)),t.oncomplete=()=>o.close()}else{const r=Object(l.f)(t),a=o.transaction("model_info_store","readwrite");let s=a.objectStore("model_info_store");const i=s.put({modelPath:this.modelPath,modelArtifactsInfo:r});let u;i.onsuccess=()=>{u=o.transaction("models_store","readwrite");const i=u.objectStore("models_store").put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:r});i.onsuccess=()=>e({modelArtifactsInfo:r}),i.onerror=e=>{s=a.objectStore("model_info_store");const t=s.delete(this.modelPath);t.onsuccess=()=>(o.close(),n(i.error)),t.onerror=e=>(o.close(),n(i.error))}},i.onerror=e=>(o.close(),n(i.error)),a.oncomplete=()=>{null==u?o.close():u.oncomplete=()=>o.close()}}},r.onerror=e=>n(r.error)})}}f.URL_SCHEME="indexeddb://";const g=e=>{return Object(c.b)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(f.URL_SCHEME)?(t=e.slice(f.URL_SCHEME.length),new f(t)):null;var t};d.registerSaveRouter(g),d.registerLoadRouter(g);class m{constructor(){this.indexedDB=h()}async listModels(){return new Promise((e,t)=>{const n=this.indexedDB.open("tensorflowjs",1);n.onupgradeneeded=()=>p(n),n.onsuccess=()=>{const r=n.result,o=r.transaction("model_info_store","readonly"),a=o.objectStore("model_info_store").getAll();a.onsuccess=()=>{const t={};for(const e of a.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},a.onerror=e=>(r.close(),t(a.error)),o.oncomplete=()=>r.close()},n.onerror=e=>t(n.error)})}async removeModel(e){var t;return e=(t=e).startsWith(f.URL_SCHEME)?t.slice(f.URL_SCHEME.length):t,new Promise((t,n)=>{const r=this.indexedDB.open("tensorflowjs",1);r.onupgradeneeded=()=>p(r),r.onsuccess=()=>{const o=r.result,a=o.transaction("model_info_store","readwrite"),s=a.objectStore("model_info_store"),i=s.get(e);let u;i.onsuccess=()=>{if(null==i.result)return o.close(),n(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{const r=s.delete(e),a=()=>{u=o.transaction("models_store","readwrite");const r=u.objectStore("models_store").delete(e);r.onsuccess=()=>t(i.result.modelArtifactsInfo),r.onerror=e=>n(i.error)};r.onsuccess=a,r.onerror=e=>(a(),o.close(),n(i.error))}},i.onerror=e=>(o.close(),n(i.error)),a.oncomplete=()=>{null==u?o.close():u.oncomplete=()=>o.close()}},r.onerror=e=>n(r.error)})}}var b=n(6);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const x="tensorflowjs_models",y="info",v="model_topology",w="weight_specs",C="weight_data",$="model_metadata";function I(e){return{info:[x,e,y].join("/"),topology:[x,e,v].join("/"),weightSpecs:[x,e,w].join("/"),weightData:[x,e,C].join("/"),modelMetadata:[x,e,$].join("/")}}function k(e){const t=e.split("/");if(t.length<3)throw new Error("Invalid key format: "+e);return t.slice(1,t.length-1).join("/")}class E{constructor(e){if(!Object(c.b)().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=I(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const t=JSON.stringify(e.modelTopology),n=JSON.stringify(e.weightSpecs),r=Object(l.f)(e);try{this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,Object(l.a)(e.weightData));const o={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};return null!=e.signature&&(o.signature=e.signature),null!=e.userDefinedMetadata&&(o.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(o.modelInitializer=e.modelInitializer),this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),{modelArtifactsInfo:r}}catch(e){throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${r.modelTopologyBytes}, weightSpecsBytes=${r.weightSpecsBytes}, weightDataBytes=${r.weightDataBytes}.`)}}}async load(){const e=JSON.parse(this.LS.getItem(this.keys.info));if(null==e)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if("JSON"!==e.modelTopologyType)throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const t={},n=JSON.parse(this.LS.getItem(this.keys.topology));if(null==n)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=n;const r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(null==r)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=r;const o=this.LS.getItem(this.keys.modelMetadata);if(null!=o){const e=JSON.parse(o);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,null!=e.signature&&(t.signature=e.signature),null!=e.userDefinedMetadata&&(t.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(t.modelInitializer=e.modelInitializer)}const a=this.LS.getItem(this.keys.weightData);if(null==a)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=Object(l.b)(a),t}}E.URL_SCHEME="localstorage://";const R=e=>{return Object(c.b)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(E.URL_SCHEME)?(t=e.slice(E.URL_SCHEME.length),new E(t)):null;var t};d.registerSaveRouter(R),d.registerLoadRouter(R);class O{constructor(){Object(b.b)(Object(c.b)().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),Object(b.b)("undefined"==typeof window||void 0!==window.localStorage,()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){const e={},t=x+"/",n="/"+y;for(let r=0;r<this.LS.length;++r){const o=this.LS.key(r);if(o.startsWith(t)&&o.endsWith(n)){e[k(o)]=JSON.parse(this.LS.getItem(o))}}return e}async removeModel(e){var t;const n=I(e=(t=e).startsWith(E.URL_SCHEME)?t.slice(E.URL_SCHEME.length):t);if(null==this.LS.getItem(n.info))throw new Error(`Cannot find model at path '${e}'`);const r=JSON.parse(this.LS.getItem(n.info));return this.LS.removeItem(n.info),this.LS.removeItem(n.topology),this.LS.removeItem(n.weightSpecs),this.LS.removeItem(n.weightData),r}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class S{constructor(){this.managers={}}static getInstance(){return null==S.instance&&(S.instance=new S),S.instance}static registerManager(e,t){Object(b.b)(null!=e,()=>"scheme must not be undefined or null."),e.endsWith("://")&&(e=e.slice(0,e.indexOf("://"))),Object(b.b)(e.length>0,()=>"scheme must not be an empty string.");const n=S.getInstance();Object(b.b)(null==n.managers[e],()=>`A model store manager is already registered for scheme '${e}'.`),n.managers[e]=t}static getManager(e){const t=this.getInstance().managers[e];if(null==t)throw new Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(this.getInstance().managers)}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class T{fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw new Error("Browser's encoder only supports utf-8, but got "+t);return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}}if(Object(c.b)().get("IS_BROWSER")){Object(c.b)().setPlatform("browser",new T);try{S.registerManager(E.URL_SCHEME,new O)}catch(e){}try{S.registerManager(f.URL_SCHEME,new m)}catch(e){}}n(162);var A=n(8);
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function N(e,t="float32",n){return t=t||"float32",b.c(e),new A.b(e,t,n)}var F=n(3),_=n(0),D=n(2);const L=Object(D.a)({cast_:
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=Object(_.a)(e,"x","cast");if(!b.B(t))throw new Error("Failed to cast to unknown dtype "+t);if("string"===t&&"string"!==n.dtype||"string"!==t&&"string"===n.dtype)throw new Error("Only strings can be casted to strings");const r={x:n},o={dtype:t};return u.a.runKernel(F.v,r,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const P=Object(D.a)({clone_:function(e){const t={x:Object(_.a)(e,"x","clone","string_or_numeric")};return u.a.runKernel(F.ob,t)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object(u.b)();const B={buffer:N,cast:L,clone:P,print:function(e,t=!1){console.log(e.toString(t))}};Object(A.e)(B);function M(e){return new Promise(e=>setTimeout(e)).then(e)}class j{constructor(e){if(!Object(c.b)().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(j.URL_SCHEME)&&(e=e.slice(j.URL_SCHEME.length)),null!=e&&0!==e.length||(e="model"),this.modelTopologyFileName=e+".json",this.weightDataFileName=e+".weights.bin"}async save(e){if("undefined"==typeof document)throw new Error("Browser downloads are not supported in this environment since `document` is not present");const t=window.URL.createObjectURL(new Blob([e.weightData],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:n};null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer);const o=window.URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),a=null==this.jsonAnchor?document.createElement("a"):this.jsonAnchor;if(a.download=this.modelTopologyFileName,a.href=o,await M(()=>a.dispatchEvent(new MouseEvent("click"))),null!=e.weightData){const e=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=t,await M(()=>e.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:Object(l.f)(e)}}}}j.URL_SCHEME="downloads://";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function U(e,t,n,r){!function(e){Object(b.b)(null!=e&&Array.isArray(e)&&e.length>0,()=>"promises must be a none empty array")}(e),function(e,t){Object(b.b)(e>=0&&e<=1,()=>"Progress fraction must be in range [0, 1], but got startFraction "+e),Object(b.b)(t>=0&&t<=1,()=>"Progress fraction must be in range [0, 1], but got endFraction "+t),Object(b.b)(t>=e,()=>`startFraction must be no more than endFraction, but got startFraction ${e} and endFraction `+t)}(n=null==n?0:n,r=null==r?1:r);let o=0;return Promise.all(e.map(a=>(a.then(a=>{const s=n+ ++o/e.length*(r-n);return t(s),a}),a)))}d.registerSaveRouter(e=>Object(c.b)().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(j.URL_SCHEME)?function(e="model"){return new j(e)}(e.slice(j.URL_SCHEME.length)):null);n(18);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function W(e,t){null==t&&(t={});const n=null==t.fetchFunc?Object(c.b)().platform.fetch:t.fetchFunc,r=e.map(e=>n(e,t.requestInit,{isBinary:!0})),o=(null==t.onProgress?await Promise.all(r):await U(r,t.onProgress,0,.5)).map(e=>e.arrayBuffer());return null==t.onProgress?await Promise.all(o):await U(o,t.onProgress,.5,1)}class V{constructor(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.onProgress=t.onProgress,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?(Object(b.b)("function"==typeof t.fetchFunc,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=Object(c.b)().platform.fetch,Object(b.b)(null!=e&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&Object(b.b)(2===e.length,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{}}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;const n=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:n};null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),t.body.append("model.json",new Blob([JSON.stringify(r)],{type:"application/json"}),"model.json"),null!=e.weightData&&t.body.append("model.weights.bin",new Blob([e.weightData],{type:"application/octet-stream"}),"model.weights.bin");const o=await this.fetch(this.path,t);if(o.ok)return{modelArtifactsInfo:Object(l.f)(e),responses:[o]};throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+o.status+".")}async load(){const e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code `+e.status+". Please verify this URL points to the model JSON of the model to load.");let t;try{t=await e.json()}catch(e){let t=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?t+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":t+=" Please make sure the server is serving valid JSON for this request.",new Error(t)}const n=t.modelTopology,r=t.weightsManifest,o=t.generatedBy,a=t.convertedBy,s=t.format,i=t.signature,u=t.userDefinedMetadata;if(null==n&&null==r)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);let c,l;if(null!=r){const e=await this.loadWeights(r);[c,l]=e}const d={modelTopology:n,weightSpecs:c,weightData:l,generatedBy:o,convertedBy:a,format:s};null!=i&&(d.signature=i),null!=u&&(d.userDefinedMetadata=u);const h=t.modelInitializer;return h&&(d.modelInitializer=h),d}async loadWeights(e){const t=Array.isArray(this.path)?this.path[1]:this.path,[n,r]=function(e){const t=e.lastIndexOf("/"),n=e.lastIndexOf("?"),r=e.substring(0,t),o=n>t?e.substring(n):"";return[r+"/",o]}(t),o=this.weightPathPrefix||n,a=[];for(const t of e)a.push(...t.weights);const s=[],i=[];for(const t of e)for(const e of t.paths)null!=this.weightUrlConverter?i.push(this.weightUrlConverter(e)):s.push(o+e+r);this.weightUrlConverter&&s.push(...await Promise.all(i));const u=await W(s,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress});return[a,Object(l.d)(u)]}}function z(e){return null!=e.match(V.URL_SCHEME_REGEX)}V.URL_SCHEME_REGEX=/^https?:\/\//;const G=(e,t)=>{if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc))return null;{let n=!0;if(n=Array.isArray(e)?e.every(e=>z(e)):z(e),n)return H(e,t)}return null};function H(e,t){return new V(e,t)}d.registerSaveRouter(G),d.registerLoadRouter(G);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function X(e,t,n){const r=e.shape.length;b.b(r===t.length,()=>`Error in slice${r}D: Length of begin ${t} must match the rank of the array (${r}).`),b.b(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let o=0;o<r;++o)b.b(t[o]+n[o]<=e.shape[o],()=>`Error in slice${r}D: begin[${o}] + size[${o}] (${t[o]+n[o]}) would overflow input.shape[${o}] (${e.shape[o]})`)}function K(e){const t=[];let n=0;for(;e>0;)1&e&&t.push(n),e/=2,n++;return t}function q(e,t,n){const r=[];for(let o=0;o<e.length;o++)r[o]=Math.ceil((t[o]-e[o])/n[o]);return r}function Y(e,t,n,r){const o=[...e];for(let e=o.length;e<r.length;e++)o.push(1);for(let e=0;e<n;e++)0===e?o[t]=1:(o.splice(t,0,1),o.pop());return o}function Q(e,t,n){return n<=e?n:n-(t-1)}function Z(e,t){const n=[];for(let r=0;r<e;r++)n.push(t+r);return n}function J(e,t,n,r,o,a,s,i,u){const c=e.length;let l=new Array(c),d=new Array(c),h=new Array(c);if(t.length&&n>0){const u=t[0],c=n+1;l=ee(s,u,c,r,e),d=te(i,u,c,o,e),h=Y(a,u,c,e)}else for(let t=0;t<c;t++)l[t]=re(s,r,a,e,t,u),d[t]=oe(i,o,a,e,t,u),h[t]=ne(a,t,u);return{begin:l,end:d,strides:h}}function ee(e,t,n,r,o){const a=[...o],s=Z(n,t);for(let o=0;o<a.length;o++)if(s.indexOf(o)>-1)a[o]=0;else{const s=Q(t,n,o);let i=r[s];e&1<<s&&(i=0),a[o]=i}return a}function te(e,t,n,r,o){const a=[...o],s=Z(n,t);for(let o=0;o<a.length;o++)if(s.indexOf(o)>-1)a[o]=Number.MAX_SAFE_INTEGER;else{const s=Q(t,n,o);let i=r[s];e&1<<s&&(i=Number.MAX_SAFE_INTEGER),a[o]=i}for(let e=0;e<a.length;e++){const t=o[e];a[e]<0&&(a[e]+=t),a[e]=b.i(0,a[e],o[e])}return a}function ne(e,t,n){let r=e[t];return(n&1<<t||null==r)&&(r=1),r}function re(e,t,n,r,o,a){let s=t[o];const i=n[o]||1;(e&1<<o||a&1<<o||null==s)&&(s=i>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);const u=r[o];return s<0&&(s+=u),s=b.i(0,s,u-1),s}function oe(e,t,n,r,o,a){let s=t[o];const i=n[o]||1;(e&1<<o||a&1<<o||null==s)&&(s=i>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);const u=r[o];return s<0&&(s+=u),s=i>0?b.i(0,s,u):b.i(-1,s,u-1),s}function ae(e,t,n){let r=n.length;for(let e=0;e<n.length;e++)if(n[e]>1){r=e;break}for(let o=r+1;o<n.length;o++)if(t[o]>0||n[o]!==e[o])return!1;return!0}function se(e,t){let n=e.length>0?e[e.length-1]:1;for(let r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}function ie(e,t,n){let r;const o=e.shape.length;let a;return r="number"==typeof t?[t,...new Array(o-1).fill(0)]:t.length<o?t.concat(new Array(o-t.length).fill(0)):t.slice(),r.forEach(e=>{b.b(-1!==e,()=>"slice() does not support negative begin indexing.")}),a=null==n?new Array(o).fill(-1):"number"==typeof n?[n,...new Array(o-1).fill(-1)]:n.length<o?n.concat(new Array(o-n.length).fill(-1)):n,a=a.map((t,n)=>t>=0?t:(b.b(-1===t,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${n}.`),e.shape[n]-r[n])),[r,a]}function ue(e,t,n,r,o,a,s,i,u){let c=t.slice(),l=n.slice(),d=r;null==r&&(d=new Array(c.length));const h=K(s);if(h.length>1)throw new Error("Multiple ellipses in slice is not allowed.");if(0!==s&&0!==i)throw new Error("Using both ellipsisMask and newAxisMask is not yet supported.");if(0!==s&&0!==u)throw new Error("Using both ellipsisMask and shrinkAxisMask is not yet supported.");const p=e.length-c.length,f=K(i),g=e.slice();f.forEach(e=>{c[e]=0,l[e]=1,g.splice(e,0,1)});const{begin:m,end:b,strides:x}=J(g,h,p,c,l,d,o,a,s);c=m,l=b,d=x;const y=K(u);y.forEach(e=>{l[e]=c[e]+1,d[e]=1});const v=q(c,l,d),w=v.filter((e,t)=>-1===y.indexOf(t));return{nonStrided:d.every(e=>1===e),$begin:c,$end:l,$strides:d,size:v,newShape:g,outShape:w}}var ce=n(4),le=n(12);const de=Object(D.a)({acos_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const t={x:Object(_.a)(e,"x","acos")};return u.a.runKernel(F.b,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const he=Object(D.a)({concat_:function(e,t=0){Object(b.b)(e.length>=1,()=>"Pass at least one tensor to concat");const n=Object(_.b)(e,"tensors","concat","string_or_numeric");if("complex64"===n[0].dtype&&n.forEach(e=>{if("complex64"!==e.dtype)throw new Error(`Cannot concatenate complex64 tensors with a tensor\n          with dtype ${e.dtype}. `)}),1===n.length)return P(n[0]);const r=n,o={axis:t};return u.a.runKernel(F.A,r,o)}});var pe=n(7);
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fe=Object(D.a)({floorDiv_:function(e,t){let n=Object(_.a)(e,"a","floorDiv"),r=Object(_.a)(t,"b","floorDiv");[n,r]=Object(pe.b)(n,r);const o={a:n,b:r};return u.a.runKernel(F.eb,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ge=Object(D.a)({div_:function(e,t){let n=Object(_.a)(e,"a","div"),r=Object(_.a)(t,"b","div");if([n,r]=Object(pe.b)(n,r),"int32"===n.dtype&&"int32"===r.dtype)return fe(n,r);const o={a:n,b:r};return u.a.runKernel(F.gc,o,{})}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const me=Object(D.a)({gather_:function(e,t,n=0,r=0){const o={x:Object(_.a)(e,"x","gather"),indices:Object(_.a)(t,"indices","gather","int32")},a={axis:n,batchDims:r};return u.a.runKernel(F.kb,o,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const be=Object(D.a)({mul_:function(e,t){let n=Object(_.a)(e,"a","mul"),r=Object(_.a)(t,"b","mul");[n,r]=Object(pe.b)(n,r);const o={a:n,b:r};return u.a.runKernel(F.Rb,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xe=Object(D.a)({pow_:function(e,t){let n=Object(_.a)(e,"base","pow"),r=Object(_.a)(t,"exp","pow");[n,r]=Object(pe.b)(n,r);const o={a:n,b:r};return u.a.runKernel(F.bc,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ye=Object(D.a)({reshape_:function(e,t){const n={x:Object(_.a)(e,"x","reshape","string_or_numeric")},r={shape:t};return u.a.runKernel(F.kc,n,r)}});var ve=n(14);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function we(e,t){if((Object(b.A)(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&Object(b.A)(e)&&!(e instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Object(ve.a)(e,[],[],t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ce=Object(D.a)({slice_:function(e,t,n){const r=Object(_.a)(e,"x","slice","string_or_numeric");if(0===r.rank)throw new Error("Slicing scalar is not possible");const o={x:r},a={begin:t,size:n};return u.a.runKernel(F.Ac,o,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $e=Object(D.a)({sqrt_:function(e){const t={x:Object(_.a)(e,"x","sqrt")};return u.a.runKernel(F.Ic,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ie=Object(D.a)({sub_:function(e,t){let n=Object(_.a)(e,"a","sub"),r=Object(_.a)(t,"b","sub");[n,r]=Object(pe.b)(n,r);const o={a:n,b:r};return u.a.runKernel(F.Nc,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ke=Object(D.a)({sum_:function(e,t=null,n=!1){let r=Object(_.a)(e,"x","sum");"bool"===r.dtype&&(r=L(r,"int32"));const o={x:r},a={axis:t,keepDims:n};return u.a.runKernel(F.Oc,o,a)}});var Ee=n(13);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Re(e,t){Object(b.d)(e);const n=Object(_.c)(e,t);if(1!==n.length)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Object(ve.a)(e,null,n,t)}var Oe=n(10);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Se(e,t="float32"){if("complex64"===t){const t=Se(e,"float32"),n=Se(e,"float32");return Object(Oe.a)(t,n)}const n=Object(b.F)(Object(b.O)(e),t);return u.a.makeTensor(n,e,t)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Te=Object(D.a)({imag_:function(e){const t={input:Object(_.a)(e,"input","imag")};return u.a.runKernel(F.pb,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ae=Object(D.a)({real_:function(e){const t={input:Object(_.a)(e,"input","real")};return u.a.runKernel(F.fc,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ne=Object(D.a)({split_:function(e,t,n=0){const r={x:Object(_.a)(e,"x","split")},o={numOrSizeSplits:t,axis:n};return u.a.runKernel(F.Hc,r,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fe=Object(D.a)({zerosLike_:function(e){const t={x:Object(_.a)(e,"x","zerosLike")};return u.a.runKernel(F.Yc,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _e=Object(D.a)({fft_:function(e){Object(b.b)("complex64"===e.dtype,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`);const t={input:e};return u.a.runKernel(F.ab,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const De=Object(D.a)({rfft_:function(e,t){Object(b.b)("float32"===e.dtype,()=>"The dtype for rfft() must be real value but got "+e.dtype);let n=e.shape[e.shape.length-1];const r=e.size/n;let o;if(null!=t&&t<n){const r=e.shape.map(e=>0),a=e.shape.map(e=>e);a[e.shape.length-1]=t,o=Ce(e,r,a),n=t}else if(null!=t&&t>n){const r=e.shape.map(e=>e);r[e.shape.length-1]=t-n,o=he([e,Se(r)],e.shape.length-1),n=t}else o=e;const a=Fe(o),s=ye(Object(Oe.a)(o,a),[r,n]),i=_e(s),u=Math.floor(n/2)+1,c=Ae(i),l=Te(i),d=Ne(c,[u,n-u],c.shape.length-1),h=Ne(l,[u,n-u],l.shape.length-1),p=o.shape.slice();return p[o.shape.length-1]=u,ye(Object(Oe.a)(d[0],h[0]),p)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Le=Object(D.a)({ifft_:function(e){Object(b.b)("complex64"===e.dtype,()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`);const t={input:e};return u.a.runKernel(F.nb,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pe=Object(D.a)({reverse_:function(e,t){const n={x:Object(_.a)(e,"x","reverse")},r={dims:t};return u.a.runKernel(F.pc,n,r)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({irfft_:function(e){const t=e.shape[e.shape.length-1],n=e.size/t;let r;if(t<=2){const o=ye(e,[n,t]);r=Le(o)}else{const o=[n,2*(t-1)],a=ye(Ae(e),[n,t]),s=ye(Te(e),[n,t]),i=Pe(Ce(a,[0,1],[n,t-2]),1),u=be(Pe(Ce(s,[0,1],[n,t-2]),1),we(-1)),c=he([a,i],1),l=he([s,u],1),d=ye(Object(Oe.a)(c,l),[o[0],o[1]]);r=Le(d)}if(r=Ae(r),3===e.rank&&0!==e.shape[0]){const t=r,n=e.shape[0];r=ye(r,[n,r.shape[0]/n,r.shape[1]]),t.dispose()}return r}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Be(e,t,n){const r=1-e%2,o=new Float32Array(e);for(let a=0;a<e;++a){const s=2*Math.PI*a/(e+r-1);o[a]=t-n*Math.cos(s)}return Re(o,"float32")}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({hammingWindow_:function(e){return Be(e,.54,.46)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Me=Object(D.a)({hannWindow_:function(e){return Be(e,.5,.5)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function je(e,t,n){const r={shape:e,value:t,dtype:n};return u.a.runKernel(F.bb,{},r)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ue(e,t,n){if(Object(b.d)(e),null!=t&&2!==t.length)throw new Error("tensor2d() requires shape to have two numbers");const r=Object(_.c)(e,n);if(2!==r.length&&1!==r.length)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===r.length&&null==t)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Object(ve.a)(e,t,r,n)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const We=Object(D.a)({frame_:function(e,t,n,r=!1,o=0){let a=0;const s=[];for(;a+t<=e.size;)s.push(Ce(e,a,t)),a+=n;if(r)for(;a<e.size;){const r=a+t-e.size,i=he([Ce(e,a,t-r),je([r],o)]);s.push(i),a+=n}return 0===s.length?Ue([],[0,t]):ye(he(s),[s.length,t])}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({stft_:function(e,t,n,r,o=Me){var a;null==r&&(a=t,r=Math.floor(Math.pow(2,Math.ceil(Math.log(a)/Math.log(2)))));const s=We(e,t,n),i=be(s,o(t));return De(i,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({cropAndResize_:function(e,t,n,r,o="bilinear",a=0){const s=Object(_.a)(e,"image","cropAndResize"),i=Object(_.a)(t,"boxes","cropAndResize","float32"),c=Object(_.a)(n,"boxInd","cropAndResize","int32"),l=i.shape[0];b.b(4===s.rank,()=>`Error in cropAndResize: image must be rank 4,but got rank ${s.rank}.`),b.b(2===i.rank&&4===i.shape[1],()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${i.shape}.`),b.b(1===c.rank&&c.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${i.shape}.`),b.b(2===r.length,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),b.b(r[0]>=1&&r[1]>=1,()=>"cropSize must be atleast [1,1], but was "+r),b.b("bilinear"===o||"nearest"===o,()=>"method must be bilinear or nearest, but was "+o);const d={image:s,boxes:i,boxInd:c},h={method:o,extrapolationValue:a,cropSize:r};return u.a.runKernel(F.J,d,h)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({flipLeftRight_:function(e){const t=Object(_.a)(e,"image","flipLeftRight","float32");b.b(4===t.rank,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);const n={image:t};return u.a.runKernel(F.cb,n,{})}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({rotateWithOffset_:function(e,t,n=0,r=.5){const o=Object(_.a)(e,"image","rotateWithOffset","float32");b.b(4===o.rank,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${o.rank}.`);const a={image:o},s={radians:t,fillValue:n,center:r};return u.a.runKernel(F.qc,a,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ve(e,t,n,r,o,a){null==r&&(r=.5),null==o&&(o=Number.NEGATIVE_INFINITY),null==a&&(a=0);const s=e.shape[0];return n=Math.min(n,s),b.b(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),b.b(2===e.rank,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),b.b(4===e.shape[1],()=>"boxes must have 4 columns, but 2nd dimension was "+e.shape[1]),b.b(1===t.rank,()=>"scores must be a 1D tensor"),b.b(t.shape[0]===s,()=>`scores has incompatible shape with boxes. Expected ${s}, but was `+t.shape[0]),b.b(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:o,softNmsSigma:a}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({nonMaxSuppression_:function(e,t,n,r=.5,o=Number.NEGATIVE_INFINITY){const a=Object(_.a)(e,"boxes","nonMaxSuppression"),s=Object(_.a)(t,"scores","nonMaxSuppression"),i=Ve(a,s,n,r,o),c={maxOutputSize:n=i.maxOutputSize,iouThreshold:r=i.iouThreshold,scoreThreshold:o=i.scoreThreshold};return u.a.runKernel(F.Tb,{boxes:a,scores:s},c)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ze(e,t,n){const r=function(e,t,n){return function(e,t,n){let r=0,o=e.length,a=0,s=!1;for(;r<o;){a=r+(o-r>>>1);const i=n(t,e[a]);i>0?r=a+1:(o=a,s=!i)}return s?r:-r-1}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e,t,n||Ge)}(e,t,n),o=r<0?-(r+1):r;e.splice(o,0,t)}function Ge(e,t){return e>t?1:e<t?-1:0}function He(e,t,n,r,o){return qe(e,t,n,r,o,0)}function Xe(e,t,n,r,o,a){return qe(e,t,n,r,o,0,!1,a,!0)}function Ke(e,t,n,r,o,a){return qe(e,t,n,r,o,a,!0)}function qe(e,t,n,r,o,a,s=!1,i=!1,u=!1){const c=[];for(let e=0;e<t.length;e++)t[e]>o&&c.push({score:t[e],boxIndex:e,suppressBeginIndex:0});c.sort(Ze);const l=a>0?-.5/a:0,d=[],h=[];for(;d.length<n&&c.length>0;){const t=c.pop(),{score:n,boxIndex:a,suppressBeginIndex:s}=t;if(n<o)break;let i=!1;for(let n=d.length-1;n>=s;--n){const s=Ye(e,a,d[n]);if(s>=r){i=!0;break}if(t.score=t.score*Qe(r,l,s),t.score<=o)break}t.suppressBeginIndex=d.length,i||(t.score===n?(d.push(a),h.push(t.score)):t.score>o&&ze(c,t,Ze))}const p=d.length,f=n-p;i&&f>0&&(d.push(...new Array(f).fill(0)),h.push(...new Array(f).fill(0)));const g={selectedIndices:d};return s&&(g.selectedScores=h),u&&(g.validOutputs=p),g}function Ye(e,t,n){const r=e.subarray(4*t,4*t+4),o=e.subarray(4*n,4*n+4),a=Math.min(r[0],r[2]),s=Math.min(r[1],r[3]),i=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),c=Math.min(o[0],o[2]),l=Math.min(o[1],o[3]),d=Math.max(o[0],o[2]),h=Math.max(o[1],o[3]),p=(i-a)*(u-s),f=(d-c)*(h-l);if(p<=0||f<=0)return 0;const g=Math.max(a,c),m=Math.max(s,l),b=Math.min(i,d),x=Math.min(u,h),y=Math.max(b-g,0)*Math.max(x-m,0);return y/(p+f-y)}function Qe(e,t,n){const r=Math.exp(t*n*n);return n<=e?r:0}function Ze(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({nonMaxSuppressionWithScore_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r=.5,o=Number.NEGATIVE_INFINITY,a=0){const s=Object(_.a)(e,"boxes","nonMaxSuppression"),i=Object(_.a)(t,"scores","nonMaxSuppression"),c=Ve(s,i,n,r,o,a),l={boxes:s,scores:i},d={maxOutputSize:n=c.maxOutputSize,iouThreshold:r=c.iouThreshold,scoreThreshold:o=c.scoreThreshold,softNmsSigma:a=c.softNmsSigma},h=u.a.runKernel(F.Vb,l,d);return{selectedIndices:h[0],selectedScores:h[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({nonMaxSuppressionPadded_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r=.5,o=Number.NEGATIVE_INFINITY,a=!1){const s=Object(_.a)(e,"boxes","nonMaxSuppression"),i=Object(_.a)(t,"scores","nonMaxSuppression"),c=Ve(s,i,n,r,o,null),l={boxes:s,scores:i},d={maxOutputSize:c.maxOutputSize,iouThreshold:c.iouThreshold,scoreThreshold:c.scoreThreshold,padToMaxOutputSize:a},h=u.a.runKernel(F.Ub,l,d);return{selectedIndices:h[0],validOutputs:h[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({resizeBilinear_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n=!1,r=!1){const o=Object(_.a)(e,"images","resizeBilinear");b.b(3===o.rank||4===o.rank,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${o.rank}.`),b.b(2===t.length,()=>"Error in resizeBilinear: new shape must 2D, but got shape "+t+"."),b.b(!1===r||!1===n,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let a=o,s=!1;3===o.rank&&(s=!0,a=ye(o,[1,o.shape[0],o.shape[1],o.shape[2]]));const[]=t,i={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=u.a.runKernel(F.lc,i,c);return s?ye(l,[l.shape[1],l.shape[2],l.shape[3]]):l}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({resizeNearestNeighbor_:function(e,t,n=!1,r=!1){const o=Object(_.a)(e,"images","resizeNearestNeighbor");b.b(3===o.rank||4===o.rank,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${o.rank}.`),b.b(2===t.length,()=>"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+t+"."),b.b("float32"===o.dtype||"int32"===o.dtype,()=>"`images` must have `int32` or `float32` as dtype"),b.b(!1===r||!1===n,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let a=o,s=!1;3===o.rank&&(s=!0,a=ye(o,[1,o.shape[0],o.shape[1],o.shape[2]]));const[]=t,i={images:a},c={alignCorners:n,halfPixelCenters:r,size:t},l=u.a.runKernel(F.nc,i,c);return s?ye(l,[l.shape[1],l.shape[2],l.shape[3]]):l}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Je=Object(D.a)({bincount_:function(e,t,n){const r=Object(_.a)(e,"x","bincount"),o=Object(_.a)(t,"weights","bincount");b.b("int32"===r.dtype,()=>"Error in bincount: input dtype must be int32, but got "+r.dtype),b.b(n>=0,()=>`size must be non-negative, but got ${n}.`),b.b(o.size===r.size||0===o.size,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: `+o.shape+".");const a={x:r,weights:o},s={size:n};return u.a.runKernel(F.u,a,s)}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function et(e,t){const n=e.length,r=[];for(let o=0;o<n;o++){const a=n-1-o,s=e[a]||1;(t[t.length-1-o]||1)>1&&1===s&&r.unshift(a)}return r}function tt(e,t){const n=[];for(let r=0;r<t.length;r++){const o=e[e.length-r-1],a=t.length-r-1,s=t[a];(null==o||1===o&&s>1)&&n.unshift(a)}return n}function nt(e,t){const n=[],r=Math.max(e.length,t.length);for(let o=0;o<r;o++){let r=e[e.length-o-1];null==r&&(r=1);let a=t[t.length-o-1];if(null==a&&(a=1),1===r)n.unshift(a);else if(1===a)n.unshift(r);else{if(r!==a){throw Error(`Operands could not be broadcast together with shapes ${e} and ${t}.`)}n.unshift(r)}}return n}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rt=Object(D.a)({lessEqual_:function(e,t){let n=Object(_.a)(e,"a","lessEqual"),r=Object(_.a)(t,"b","lessEqual");[n,r]=Object(pe.b)(n,r),nt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernel(F.xb,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ot=Object(D.a)({greater_:function(e,t){let n=Object(_.a)(e,"a","greater"),r=Object(_.a)(t,"b","greater");[n,r]=Object(pe.b)(n,r),nt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernel(F.lb,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const at=Object(D.a)({add_:function(e,t){let n=Object(_.a)(e,"a","add"),r=Object(_.a)(t,"b","add");[n,r]=Object(pe.b)(n,r);const o={a:n,b:r};return u.a.runKernel(F.d,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const st=Object(D.a)({round_:function(e){const t={x:Object(_.a)(e,"x","round")};return u.a.runKernel(F.rc,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const it=Object(D.a)({broadcastTo_:function(e,t){let n=Object(_.a)(e,"broadcastTo","x");const r=n.shape;if(t.some(e=>!(e>0)||e%1!=0))throw new Error(`broadcastTo(): Invalid broadcast shape [${t}].`);if(t.length<n.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){const e=n.shape.slice();for(;e.length<t.length;)e.unshift(1);n=ye(n,e)}const o=n.shape,a=Array.from(t);for(let e=t.length-1;e>=0;e--)if(o[e]===t[e])a[e]=1;else if(1!==n.shape[e])throw new Error(`broadcastTo(): [${r}] cannot be broadcast to [${t}].`);if(0===a.map((e,t)=>e>1?t:-1).filter(e=>e>=0).length)return P(n);const s={x:n},i={reps:a};return u.a.runKernel(F.Rc,s,i)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ut=Object(D.a)({where_:function(e,t,n){const r=Object(_.a)(t,"a","where"),o=Object(_.a)(n,"b","where"),a=Object(_.a)(e,"condition","where","bool"),s=nt(nt(a.shape,r.shape),o.shape),i={condition:it(a,s),t:it(r,s),e:it(o,s)};return u.a.runKernel(F.uc,i)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ct(e,t,n=1,r="float32"){if(0===n)throw new Error("Cannot have a step of zero");const o={start:e,stop:t,step:n,dtype:r};return u.a.runKernel(F.ec,{},o)}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({threshold_:function(e,t="binary",n=!1,r=.5){const o=Object(_.a)(e,"image","threshold"),a=o.shape[0]*o.shape[1];let s,i,u,c,l=be(Re([r]),255);if(b.b(3===o.rank,()=>`Error in threshold: image must be rank 3,but got rank ${o.rank}.`),b.b(3===o.shape[2]||1===o.shape[2],()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${o.shape[2]}.`),b.b("int32"===o.dtype||"float32"===o.dtype,()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${o.dtype}.`),b.b("otsu"===t||"binary"===t,()=>"Method must be binary or otsu, but was "+t),3===o.shape[2]){[s,i,u]=Ne(o,[1,1,1],-1);const e=be(s,.2989),t=be(i,.587),n=be(u,.114);c=at(at(e,t),n)}else c=e;if("otsu"===t){l=function(e,t){let n,r,o,a,s,i,u=Re([-1]),c=Re([0]),l=Re([0]);for(let d=0;d<e.size-1;d++){n=Ce(e,0,d+1),r=Ce(e,d+1),s=ge(ke(n),t),i=ge(ke(r),t);const h=ke(be(n,ct(0,n.size)));o=ge(h,ke(n));const p=je(r.shape,n.size),f=at(ct(0,r.size),p),g=be(r,f);a=ge(ke(g),ke(r));const m=Ie(o,a),b=Ie(o,a),x=be(s,i);l=be(be(x,m),b);const y=ot(l,c);c=ut(y,l,c),u=ut(y,Re([d]),u)}return u}(Je(L(st(c),"int32"),Object(Ee.a)([]),256),a)}const d=n?rt(c,l):ot(c,l);return L(be(d,255),"int32")}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({transform_:function(e,t,n="nearest",r="constant",o=0,a){const s=Object(_.a)(e,"image","transform","float32"),i=Object(_.a)(t,"transforms","transform","float32");b.b(4===s.rank,()=>`Error in transform: image must be rank 4,but got rank ${s.rank}.`),b.b(2===i.rank&&(i.shape[0]===s.shape[0]||1===i.shape[0])&&8===i.shape[1],()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),b.b(null==a||2===a.length,()=>`Error in transform: outputShape must be [height, width] or null, but got ${a}.`);const c={image:s,transforms:i},l={interpolation:n,fillMode:r,fillValue:o,outputShape:a};return u.a.runKernel(F.Tc,c,l)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lt=Object(D.a)({greaterEqual_:function(e,t){let n=Object(_.a)(e,"a","greaterEqual"),r=Object(_.a)(t,"b","greaterEqual");[n,r]=Object(pe.b)(n,r),nt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernel(F.mb,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dt=Object(D.a)({logicalAnd_:function(e,t){const n=Object(_.a)(e,"a","logicalAnd","bool"),r=Object(_.a)(t,"b","logicalAnd","bool");nt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernel(F.Bb,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ht=Object(D.a)({stack_:function(e,t=0){const n=Object(_.b)(e,"tensors","stack","string_or_numeric");b.b(n.length>=1,()=>"Pass at least one tensor to tf.stack"),n.length>0&&b.b(t<=n[0].rank,()=>"Axis must be <= rank of the tensor");const r=n,o={axis:t};return u.a.runKernel(F.Zb,r,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pt=Object(D.a)({unstack_:function(e,t=0){const n=Object(_.a)(e,"x","unstack","string_or_numeric");b.b(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`);const r={value:n},o={axis:t};return u.a.runKernel(F.Wc,r,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({bandPart_:function(e,t,n){Object(b.b)(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),Object(b.b)(n%1==0,()=>`bandPart(): numUpper must be an integer, got ${n}.`);const r=Object(_.a)(e,"a","bandPart");Object(b.b)(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);const o=r.shape,[a,s]=r.shape.slice(-2);if(!(t<=a))throw new Error(`bandPart(): numLower (${t}) must not be greater than the number of rows (${a}).`);if(!(n<=s))throw new Error(`bandPart(): numUpper (${n}) must not be greater than the number of columns (${s}).`);t<0&&(t=a),n<0&&(n=s);const i=ye(ct(0,a,1,"int32"),[-1,1]),u=ct(0,s,1,"int32"),c=Ie(i,u),l=dt(rt(c,we(+t,"int32")),lt(c,we(-n,"int32"))),d=Se([a,s],r.dtype);return ye(ht(pt(ye(r,[-1,a,s])).map(e=>ut(l,e,d))),o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ft=Object(D.a)({abs_:function(e){const t=Object(_.a)(e,"x","abs");if("complex64"===t.dtype){const e={x:t};return u.a.runKernel(F.z,e)}{const e={x:t};return u.a.runKernel(F.a,e)}}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gt(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function mt(e,t,n){const r=e.length+t.length,o=[];let a=0,s=0;for(let i=0;i<r;i++)-1===n.indexOf(i)?o.push(e[a++]):o.push(t[s++]);return o}function bt(e,t){const n=[],r=e.length;for(let o=0;o<r;o++)-1===t.indexOf(o)&&n.push(e[o]);return[n,t.map(t=>e[t])]}function xt(e,t){return mt(e,t.map(e=>1),t)}function yt(e,t,n){b.b(gt(t,n),()=>e+" supports only inner-most axes for now. "+`Got axes ${t} and rank-${n} input.`)}function vt(e,t){if(gt(e,t))return null;const n=[];for(let r=0;r<t;++r)-1===e.indexOf(r)&&n.push(r);return e.forEach(e=>n.push(e)),n}function wt(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function Ct(e,t){const n=[];for(let r=t-e;r<t;++r)n.push(r);return n}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $t=Object(D.a)({max_:function(e,t=null,n=!1){const r={x:Object(_.a)(e,"x","max")},o={reductionIndices:t,keepDims:n};return u.a.runKernel(F.Eb,r,o)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const It=Object(D.a)({min_:function(e,t=null,n=!1){const r={x:Object(_.a)(e,"x","min")},o={axis:t,keepDims:n};return u.a.runKernel(F.Mb,r,o)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kt=Object(D.a)({square_:function(e){const t=Object(_.a)(e,"x","square");return u.a.runKernel("Square",{x:t},{})}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Et=Object(D.a)({norm_:function(e,t="euclidean",n=null,r=!1){const o=function e(t,n,r=null){if(0===t.rank)return ft(t);if(1!==t.rank&&null===r)return e(ye(t,[-1]),n,r);if(1===t.rank||"number"==typeof r||Array.isArray(r)&&1===r.length){if(1===n)return ke(ft(t),r);if(n===1/0)return $t(ft(t),r);if(n===-1/0)return It(ft(t),r);if("euclidean"===n||2===n)return $e(ke(xe(ft(t),we(2,"int32")),r));throw new Error("Error in norm: invalid ord value: "+n)}if(Array.isArray(r)&&2===r.length){if(1===n)return $t(ke(ft(t),r[0]),r[1]-1);if(n===1/0)return $t(ke(ft(t),r[1]),r[0]);if(n===-1/0)return It(ke(ft(t),r[1]),r[0]);if("fro"===n||"euclidean"===n)return $e(ke(kt(t),r));throw new Error("Error in norm: invalid ord value: "+n)}throw new Error("Error in norm: invalid axis: "+r)}(e=Object(_.a)(e,"x","norm"),t,n);let a=o.shape;if(r){const t=Object(b.I)(n,e.shape);a=xt(o.shape,t)}return ye(o,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rt=Object(D.a)({squeeze_:function(e,t){const n=Object(_.a)(e,"x","squeeze");return ye(n,Object(b.Q)(n.shape,t).newShape)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({gramSchmidt_:function(e){let t;if(Array.isArray(e)){t=!1,Object(b.b)(null!=e&&e.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const n=e[0].shape[0];for(let t=1;t<e.length;++t)Object(b.b)(e[t].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${n})`)}else t=!0,e=Ne(e,e.shape[0],0).map(e=>Rt(e,[0]));Object(b.b)(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);const n=[],r=e;for(let t=0;t<e.length;++t)n.push(u.a.tidy(()=>{let e=r[t];if(t>0)for(let r=0;r<t;++r){const t=be(ke(be(n[r],e)),n[r]);e=Ie(e,t)}return ge(e,Et(e,"euclidean"))}));return t?ht(n,0):n}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ot(){return u.a}Object(A.d)((function(e){Object(c.b)().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(e+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}));const St=Object(D.a)({expandDims_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=0){const n=Object(_.a)(e,"x","expandDims","string_or_numeric");b.b(t<=n.rank,()=>"Axis must be <= rank of the tensor");const r={input:n},o={dim:t};return u.a.runKernel(F.Y,r,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tt=Object(D.a)({tile_:function(e,t){const n=Object(_.a)(e,"x","tile","string_or_numeric");b.b(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);const r={x:n},o={reps:t};return u.a.runKernel(F.Rc,r,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const At=Object(D.a)({eye_:function(e,t,n,r="float32"){null==t&&(t=e);const o=N([e,t],r),a=e<=t?e:t;for(let e=0;e<a;++e)o.set(1,e,e);const s=ye(o.toTensor(),[e,t]);if(null==n)return s;if(1===n.length)return Tt(St(s,0),[n[0],1,1]);if(2===n.length)return Tt(St(St(s,0),0),[n[0],n[1],1,1]);if(3===n.length)return Tt(St(St(St(s,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nt=Object(D.a)({matMul_:function(e,t,n=!1,r=!1){let o=Object(_.a)(e,"a","matMul"),a=Object(_.a)(t,"b","matMul");[o,a]=Object(pe.b)(o,a);const s={a:o,b:a},i={transposeA:n,transposeB:r};return u.a.runKernel(F.s,s,i)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ft=Object(D.a)({neg_:function(e){const t={x:Object(_.a)(e,"x","neg")};return u.a.runKernel(F.Sb,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _t=Object(D.a)({transpose_:function(e,t){const n=Object(_.a)(e,"x","transpose");if(null==t&&(t=n.shape.map((e,t)=>t).reverse()),b.b(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of perm ${t}.`),t.forEach(e=>{b.b(e>=0&&e<n.rank,()=>"All entries in 'perm' must be between 0 and "+(n.rank-1)+" but got "+t)}),n.rank<=1)return n.clone();const r={x:n},o={perm:t};return u.a.runKernel(F.Uc,r,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dt(e,t=!1){return u.a.tidy(()=>{Object(b.b)(2===e.shape.length,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);const n=e.shape[0],r=e.shape[1];let o=At(n),a=P(e);const s=Ue([[1]],[1,1]);let i=P(s);const c=n>=r?r:n;for(let e=0;e<c;++e){const t=a,c=i,d=o;[i,a,o]=u.a.tidy(()=>{const t=Ce(a,[e,e],[n-e,1]),u=Et(t),c=Ce(a,[e,e],[1,1]),l=ut(ot(c,0),Ue([[-1]]),Ue([[1]])),d=Ie(c,be(l,u)),h=ge(t,d);i=1===h.shape[0]?P(s):he([s,Ce(h,[1,0],[h.shape[0]-1,h.shape[1]])],0);const p=Ft(ge(Nt(l,d),u)),f=Ce(a,[e,0],[n-e,r]),g=be(p,i),m=_t(i);if(0===e)a=Ie(f,Nt(g,Nt(m,f)));else{const t=Ie(f,Nt(g,Nt(m,f)));a=he([Ce(a,[0,0],[e,r]),t],0)}const b=_t(g),x=Ce(o,[0,e],[n,o.shape[1]-e]);if(0===e)o=Ie(x,Nt(Nt(x,i),b));else{const t=Ie(x,Nt(Nt(x,i),b));o=he([Ce(o,[0,0],[n,e]),t],1)}return[i,a,o]}),l=[t,c,d],Object(pe.a)(l).forEach(e=>e.dispose())}var l;return!t&&n>r&&(o=Ce(o,[0,0],[n,r]),a=Ce(a,[0,0],[r,r])),[o,a]})}Object(D.a)({qr_:function(e,t=!1){if(Object(b.b)(e.rank>=2,()=>"qr() requires input tensor to have a rank >= 2, but got rank "+e.rank),2===e.rank)return Dt(e,t);{const n=e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),r=pt(ye(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),o=[],a=[];r.forEach(e=>{const[n,r]=Dt(e,t);o.push(n),a.push(r)});return[ye(ht(o,0),e.shape),ye(ht(a,0),e.shape)]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Lt;!function(e){e[e.NONE=0]="NONE",e[e.MEAN=1]="MEAN",e[e.SUM=2]="SUM",e[e.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"}(Lt||(Lt={}));const Pt=Object(D.a)({mean_:
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=null,n=!1){const r={x:Object(_.a)(e,"x","mean")},o={axis:t,keepDims:n};return u.a.runKernel(F.Lb,r,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bt=Object(D.a)({notEqual_:function(e,t){let n=Object(_.a)(e,"a","notEqual"),r=Object(_.a)(t,"b","notEqual");[n,r]=Object(pe.b)(n,r),nt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernel(F.Wb,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mt=Object(D.a)({computeWeightedLoss_:function(e,t,n=Lt.SUM_BY_NONZERO_WEIGHTS){const r=Object(_.a)(e,"losses","computeWeightedLoss");let o=null;null!=t&&(o=Object(_.a)(t,"weights","computeWeightedLoss"));const a=null==o?r:be(r,o);if(n===Lt.NONE)return a;if(n===Lt.SUM)return ke(a);if(n===Lt.MEAN){if(null==o)return Pt(a);{const e=r.size/o.size,t=ge(ke(a),ke(o));return e>1?ge(t,we(e)):t}}if(n===Lt.SUM_BY_NONZERO_WEIGHTS){if(null==o)return ge(ke(a),we(r.size));{const e=be(o,function e(t,n="float32"){if("complex64"===n){const n=e(t,"float32"),r=Se(t,"float32");return Object(Oe.a)(n,r)}const r=Object(b.D)(Object(b.O)(t),n);return u.a.makeTensor(r,t,n)}(r.shape)),t=L(ke(Bt(e,we(0))),"float32");return ge(ke(a),t)}}throw Error("Unknown reduction: "+n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({absoluteDifference_:function(e,t,n,r=Lt.SUM_BY_NONZERO_WEIGHTS){const o=Object(_.a)(e,"labels","absoluteDifference"),a=Object(_.a)(t,"predictions","absoluteDifference");let s=null;null!=n&&(s=Object(_.a)(n,"weights","absoluteDifference")),Object(b.e)(o.shape,a.shape,"Error in absoluteDifference: ");const i=ft(Ie(o,a));return Mt(i,s,r)}});Object(D.a)({cosineDistance_:function(e,t,n,r,o=Lt.SUM_BY_NONZERO_WEIGHTS){const a=Object(_.a)(e,"labels","cosineDistance"),s=Object(_.a)(t,"predictions","cosineDistance");let i=null;null!=r&&(i=Object(_.a)(r,"weights","cosineDistance")),Object(b.e)(a.shape,s.shape,"Error in cosineDistance: ");const u=we(1),c=Ie(u,ke(be(a,s),n,!0));return Mt(c,i,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jt=Object(D.a)({relu_:function(e){const t={x:Object(_.a)(e,"x","relu")};return u.a.runKernel(F.ic,t)}});Object(D.a)({hingeLoss_:function(e,t,n,r=Lt.SUM_BY_NONZERO_WEIGHTS){let o=Object(_.a)(e,"labels","hingeLoss");const a=Object(_.a)(t,"predictions","hingeLoss");let s=null;null!=n&&(s=Object(_.a)(n,"weights","hingeLoss")),Object(b.e)(o.shape,a.shape,"Error in hingeLoss: ");const i=we(1);o=Ie(be(we(2),o),i);const u=jt(Ie(i,be(o,a)));return Mt(u,s,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ut=Object(D.a)({minimum_:function(e,t){let n=Object(_.a)(e,"a","minimum"),r=Object(_.a)(t,"b","minimum");[n,r]=Object(pe.b)(n,r),"bool"===n.dtype&&(n=L(n,"int32"),r=L(r,"int32")),nt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernel(F.Nb,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({huberLoss_:function(e,t,n,r=1,o=Lt.SUM_BY_NONZERO_WEIGHTS){const a=Object(_.a)(e,"labels","huberLoss"),s=Object(_.a)(t,"predictions","huberLoss");let i=null;null!=n&&(i=Object(_.a)(n,"weights","huberLoss")),Object(b.e)(a.shape,s.shape,"Error in huberLoss: ");const u=we(r),c=ft(Ie(s,a)),l=Ut(c,u),d=Ie(c,l),h=at(be(we(.5),kt(l)),be(u,d));return Mt(h,i,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wt=Object(D.a)({log_:function(e){const t={x:Object(_.a)(e,"x","log")};return u.a.runKernel(F.zb,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({logLoss_:function(e,t,n,r=1e-7,o=Lt.SUM_BY_NONZERO_WEIGHTS){const a=Object(_.a)(e,"labels","logLoss"),s=Object(_.a)(t,"predictions","logLoss");let i=null;null!=n&&(i=Object(_.a)(n,"weights","logLoss")),Object(b.e)(a.shape,s.shape,"Error in logLoss: ");const u=we(1),c=we(r),l=Ft(be(a,Wt(at(s,c)))),d=be(Ie(u,a),Wt(at(Ie(u,s),c))),h=Ie(l,d);return Mt(h,i,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vt=Object(D.a)({squaredDifference_:function(e,t){let n=Object(_.a)(e,"a","squaredDifference"),r=Object(_.a)(t,"b","squaredDifference");[n,r]=Object(pe.b)(n,r),nt(n.shape,r.shape);const o={a:n,b:r};return u.a.runKernel(F.Kc,o,{})}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({meanSquaredError_:function(e,t,n,r=Lt.SUM_BY_NONZERO_WEIGHTS){const o=Object(_.a)(e,"labels","meanSquaredError"),a=Object(_.a)(t,"predictions","meanSquaredError");let s=null;null!=n&&(s=Object(_.a)(n,"weights","meanSquaredError")),Object(b.e)(o.shape,a.shape,"Error in meanSquaredError: ");const i=Vt(o,a);return Mt(i,s,r)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zt=Object(D.a)({exp_:function(e){const t={x:Object(_.a)(e,"x","exp")};return u.a.runKernel(F.X,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gt=Object(D.a)({log1p_:function(e){const t={x:Object(_.a)(e,"x","log1p")};return u.a.runKernel(F.Ab,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({sigmoidCrossEntropy_:function(e,t,n,r=0,o=Lt.SUM_BY_NONZERO_WEIGHTS){let a=Object(_.a)(e,"multiClassLabels","sigmoidCrossEntropy");const s=Object(_.a)(t,"logits","sigmoidCrossEntropy");let i=null;if(null!=n&&(i=Object(_.a)(n,"weights","sigmoidCrossEntropy")),Object(b.e)(a.shape,s.shape,"Error in sigmoidCrossEntropy: "),r>0){const e=we(r),t=we(1),n=we(.5);a=at(be(a,Ie(t,e)),be(n,e))}const u=function(e,t){const n=Object(_.a)(e,"labels","sigmoidCrossEntropyWithLogits"),r=Object(_.a)(t,"logits","sigmoidCrossEntropyWithLogits");Object(b.e)(n.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");const o=jt(r),a=be(r,n),s=Gt(zt(Ft(ft(r))));return at(Ie(o,a),s)}(a,s);return Mt(u,i,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ht=Object(D.a)({logSumExp_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t=null,n=!1){const r=Object(_.a)(e,"x","logSumExp"),o=Object(b.I)(t,r.shape),a=$t(r,o,!0),s=Ie(r,a),i=zt(s),u=ke(i,o),c=Wt(u),l=at(ye(a,c.shape),c);if(n){const e=xt(l.shape,o);return ye(l,e)}return l}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xt(e,t,n=-1){if(-1===n&&(n=t.rank-1),n!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was `+n);var r;return(r=(e,t,r)=>{const o=Ht(t,[n],!0),a=Ie(L(t,"float32"),o);r([e,a]);const s=Ft(be(a,e));return{value:ke(s,[n]),gradFunc:(e,t)=>{const[r,o]=t,a=xt(e.shape,[n]);return[be(ye(e,a),Ie(L(r,"float32"),zt(o))),be(ye(e,a),Ie(zt(o),L(r,"float32")))]}}},u.a.customGrad(r))(e,t)}Object(D.a)({softmaxCrossEntropy_:function(e,t,n,r=0,o=Lt.SUM_BY_NONZERO_WEIGHTS){let a=Object(_.a)(e,"onehotLabels","softmaxCrossEntropy");const s=Object(_.a)(t,"logits","softmaxCrossEntropy");let i=null;if(null!=n&&(i=Object(_.a)(n,"weights","softmaxCrossEntropy")),Object(b.e)(a.shape,s.shape,"Error in softmaxCrossEntropy: "),r>0){const e=we(r),t=we(1),n=we(a.shape[1]);a=at(be(a,Ie(t,e)),ge(e,n))}const u=Xt(a,s);return Mt(u,i,o)}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({sparseFillEmptyRows_:function(e,t,n,r){const o=Object(_.a)(e,"indices","sparseFillEmptyRows"),a=Object(_.a)(t,"values","sparseFillEmptyRows"),s=Object(_.a)(n,"denseShape","sparseFillEmptyRows"),i=Object(_.a)(r,"defaultValue","sparseFillEmptyRows",a.dtype);if(2!==o.rank)throw new Error("Indices should be Tensor2D but received shape\n        "+o.shape);if(1!==a.rank)throw new Error("Values should be Tensor1D but received shape "+a.shape);if(1!==s.rank)throw new Error("Dense shape should be Tensor1D but received shape "+s.shape);if(0!==i.rank)throw new Error("Default value should be a scalar but received shape "+i.shape);const c={indices:o,values:a,denseShape:s,defaultValue:i},l=u.a.runKernel(F.Ec,c);return{outputIndices:l[0],outputValues:l[1],emptyRowIndicator:l[2],reverseIndexMap:l[3]}}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Object(D.a)({sparseReshape_:function(e,t,n){const r=Object(_.a)(e,"inputIndices","sparseReshape"),o=Object(_.a)(t,"inputShape","sparseReshape"),a=Object(_.a)(n,"newShape","sparseReshape");if(2!==r.rank)throw new Error("Input indices should be Tensor2D but received shape\n        "+r.shape);if(1!==o.rank)throw new Error("Input shape should be Tensor1D but received shape "+o.shape);if(1!==a.rank)throw new Error("New shape should be Tensor1D but received shape "+a.shape);const s={inputIndices:r,inputShape:o,newShape:a},i=u.a.runKernel(F.Fc,s);return{outputIndices:i[0],outputShape:i[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Kt=n(11);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qt(e,t){const n=e[0].length;e.forEach((e,t)=>{b.b(e.length===n,()=>`Error in concat${n}D: rank of tensors[${t}] must be the same as the rank of the rest (${n})`)}),b.b(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);const r=e[0];e.forEach((e,o)=>{for(let a=0;a<n;a++)b.b(a===t||e[a]===r[a],()=>`Error in concat${n}D: Shape of tensors[${o}] (${e}) does not match the shape of the rest (${r}) along the non-concatenated axis ${o}.`)})}function Yt(e,t){const n=e[0].slice();for(let r=1;r<e.length;r++)n[t]+=e[r][t];return n}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qt(e,t,n,r,o="NHWC",a){return en(e,[...t,e[3]],n,a,r,null,null,ln(o))}function Zt(e,t,n,r,o,a,s="channelsLast"){const[i,u]=rn(t);let c;if("channelsLast"===s)c=[i,u,e[3],e[3]];else{if("channelsFirst"!==s)throw new Error("Unknown dataFormat "+s);c=[i,u,e[1],e[1]]}return en(e,c,n,r,o,a,!1,s)}function Jt(e,t,n,r,o,a,s="NDHWC"){const[i,u,c]=on(t);let l,d;if("NDHWC"===s)d="channelsLast",l=[i,u,c,e[4],e[4]];else{if("NCDHW"!==s)throw new Error("Unknown dataFormat "+s);d="channelsFirst",l=[i,u,c,e[1],e[1]]}return tn(e,l,n,r,o,!1,d,a)}function en(e,t,n,r,o,a,s=!1,i="channelsLast"){let[u,c,l,d]=[-1,-1,-1,-1];if("channelsLast"===i)[u,c,l,d]=e;else{if("channelsFirst"!==i)throw new Error("Unknown dataFormat "+i);[u,d,c,l]=e}const[h,p,,f]=t,[g,m]=rn(n),[b,x]=rn(r),y=an(h,b),v=an(p,x),{padInfo:w,outHeight:C,outWidth:$}=function(e,t,n,r,o,a,s,i,u){let c,l,d;if("number"==typeof e){c={top:e,bottom:e,left:e,right:e,type:0===e?"VALID":"NUMBER"};const o=function(e,t,n,r,o){null==r&&(r=nn(e,t,n));const a=e[0],s=e[1],i=sn((a-t+2*r)/n+1,o),u=sn((s-t+2*r)/n+1,o);return[i,u]}([t,n],a,r,e,i);l=o[0],d=o[1]}else if("same"===e){l=Math.ceil(t/r),d=Math.ceil(n/o);const e=Math.max(0,(l-1)*r+a-t),i=Math.max(0,(d-1)*o+s-n),u=Math.floor(e/2),h=e-u,p=Math.floor(i/2);c={top:u,bottom:h,left:p,right:i-p,type:"SAME"}}else if("valid"===e)c={top:0,bottom:0,left:0,right:0,type:"VALID"},l=Math.ceil((t-a+1)/r),d=Math.ceil((n-s+1)/o);else{if("object"!=typeof e)throw Error("Unknown padding parameter: "+e);{const h="channelsLast"===u?e[1][0]:e[2][0],p="channelsLast"===u?e[1][1]:e[2][1],f="channelsLast"===u?e[2][0]:e[3][0],g="channelsLast"===u?e[2][1]:e[3][1];c={top:h,bottom:p,left:f,right:g,type:0===h&&0===p&&0===f&&0===g?"VALID":"EXPLICIT"},l=sn((t-a+h+p)/r+1,i),d=sn((n-s+f+g)/o+1,i)}}return{padInfo:c,outHeight:l,outWidth:d}}(o,c,l,g,m,y,v,a,i),I=s?f*d:f;let k;return"channelsFirst"===i?k=[u,I,C,$]:"channelsLast"===i&&(k=[u,C,$,I]),{batchSize:u,dataFormat:i,inHeight:c,inWidth:l,inChannels:d,outHeight:C,outWidth:$,outChannels:I,padInfo:w,strideHeight:g,strideWidth:m,filterHeight:h,filterWidth:p,effectiveFilterHeight:y,effectiveFilterWidth:v,dilationHeight:b,dilationWidth:x,inShape:e,outShape:k,filterShape:t}}function tn(e,t,n,r,o,a=!1,s="channelsLast",i){let[u,c,l,d,h]=[-1,-1,-1,-1,-1];if("channelsLast"===s)[u,c,l,d,h]=e;else{if("channelsFirst"!==s)throw new Error("Unknown dataFormat "+s);[u,h,c,l,d]=e}const[p,f,g,,m]=t,[b,x,y]=on(n),[v,w,C]=on(r),$=an(p,v),I=an(f,w),k=an(g,C),{padInfo:E,outDepth:R,outHeight:O,outWidth:S}=function(e,t,n,r,o,a,s,i,u,c,l){let d,h,p,f;if("number"==typeof e){d={top:e,bottom:e,left:e,right:e,front:e,back:e,type:0===e?"VALID":"NUMBER"};const a=function(e,t,n,r,o,a){null==o&&(o=nn(e,t,r));const s=e[0],i=e[1],u=e[2],c=sn((s-t+2*o)/r+1,a),l=sn((i-t+2*o)/r+1,a),d=sn((u-t+2*o)/r+1,a);return[c,l,d,n]}([t,n,r,1],i,1,o,e,l);h=a[0],p=a[1],f=a[2]}else if("same"===e){h=Math.ceil(t/o),p=Math.ceil(n/a),f=Math.ceil(r/s);const e=(h-1)*o+i-t,l=(p-1)*a+u-n,g=(f-1)*s+c-r,m=Math.floor(e/2),b=e-m,x=Math.floor(l/2),y=l-x,v=Math.floor(g/2);d={top:x,bottom:y,left:v,right:g-v,front:m,back:b,type:"SAME"}}else{if("valid"!==e)throw Error("Unknown padding parameter: "+e);d={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},h=Math.ceil((t-i+1)/o),p=Math.ceil((n-u+1)/a),f=Math.ceil((r-c+1)/s)}return{padInfo:d,outDepth:h,outHeight:p,outWidth:f}}(o,c,l,d,b,x,y,$,I,k,i),T=a?m*h:m;let A;return"channelsFirst"===s?A=[u,T,R,O,S]:"channelsLast"===s&&(A=[u,R,O,S,T]),{batchSize:u,dataFormat:s,inDepth:c,inHeight:l,inWidth:d,inChannels:h,outDepth:R,outHeight:O,outWidth:S,outChannels:T,padInfo:E,strideDepth:b,strideHeight:x,strideWidth:y,filterDepth:p,filterHeight:f,filterWidth:g,effectiveFilterDepth:$,effectiveFilterHeight:I,effectiveFilterWidth:k,dilationDepth:v,dilationHeight:w,dilationWidth:C,inShape:e,outShape:A,filterShape:t}}function nn(e,t,n,r=1){const o=an(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)}function rn(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function on(e){return"number"==typeof e?[e,e,e]:e}function an(e,t){return t<=1?e:e+(e-1)*(t-1)}function sn(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw new Error("Unknown roundingMode "+t)}}function un(e){const[t,n,r]=rn(e);return 1===t&&1===n&&1===r}function cn(e,t){return un(e)||un(t)}function ln(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw new Error("Unknown dataFormat "+e)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dn=Object(D.a)({elu_:function(e){const t={x:Object(_.a)(e,"x","elu")};return u.a.runKernel(F.T,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hn=Object(D.a)({leakyRelu_:function(e,t=.2){const n={x:Object(_.a)(e,"x","leakyRelu")},r={alpha:t};return u.a.runKernel(F.vb,n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pn=Object(D.a)({prelu_:function(e,t){const n={x:Object(_.a)(e,"x","prelu"),alpha:Object(_.a)(t,"alpha","prelu")};return u.a.runKernel(F.cc,n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fn=Object(D.a)({relu6_:function(e){const t={x:Object(_.a)(e,"x","relu6")};return u.a.runKernel(F.jc,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gn=Object(D.a)({sigmoid_:function(e){const t={x:Object(_.a)(e,"x","sigmoid")};return u.a.runKernel(F.wc,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mn=Object(D.a)({step_:function(e,t=0){const n={x:Object(_.a)(e,"x","step")},r={alpha:t};return u.a.runKernel(F.Lc,n,r)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bn(e,t,n){if(null==n||"linear"===n)return e;if("relu"===n)return be(e,mn(t));throw new Error(`Cannot compute gradient for fused activation ${n}.`)}function xn(e,t){let n=t;const r=tt(e.shape,t.shape);return r.length>0&&(n=ke(n,r)),ye(n,e.shape)}function yn(e,t,n,r){if("linear"===t)return e;if("relu"===t)return jt(e);if("elu"===t)return dn(e);if("relu6"===t)return fn(e);if("prelu"===t)return pn(e,n);if("leakyrelu"===t)return hn(e,r);if("sigmoid"===t)return gn(e);throw new Error(`Unknown fused activation ${t}.`)}const vn=(e,t)=>!(e>0)||"linear"===t,wn=30;
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cn(e){return e<=wn?e:Object(b.G)(e,Math.floor(Math.sqrt(e)))}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $n(e,t,n){return[n*("number"==typeof e?e:e[0]),t*("number"==typeof e?e:e[1])]}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function In(e,t,n,r=!0){let o=[];if(r)o=o.concat(t.slice(0)),o.push(e[0]/n),o=o.concat(e.slice(1));else{o=o.concat(e[0]);const n=t.length;for(let r=0;r<n;++r)o=o.concat([e[r+1]/t[r],t[r]]);o=o.concat(e.slice(n+1))}return o}function kn(e,t,n=!0){const r=[];if(n){r.push(t);for(let n=t+1;n<e;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{const n=[],o=[];for(let r=1;r<e;++r)r>=2*t+1||r%2==1?o.push(r):n.push(r);r.push(...n),r.push(0),r.push(...o)}return r}function En(e,t,n,r=!0){const o=[];r?o.push(e[0]/n):o.push(e[0]*n);for(let n=1;n<e.length;++n)n<=t.length?r?o.push(t[n-1]*e[n]):o.push(e[n]/t[n-1]):o.push(e[n]);return o}function Rn(e,t){const n=[0];for(let r=0;r<t;++r)n.push(e[r][0]);return n}function On(e,t,n){const r=e.slice(0,1);for(let o=0;o<n;++o)r.push(e[o+1]-t[o][0]-t[o][1]);return r}function Sn(e,t){const n=e.shape.length,r=t.shape.length;if(n<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(r<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if("int32"!==t.dtype)throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[r-1]>n)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[r-1]} vs. ${n}`);if(0===Object(b.O)(e.shape))throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);const o=t.shape,a=o[o.length-1];let s=1;for(let e=0;e<o.length-1;++e)s*=o[e];const i=e.shape,u=o.slice();u.pop();let c=1;for(let e=a;e<n;++e)c*=i[e],u.push(i[e]);const l=[...Object(b.j)(e.shape).map(e=>e/c),1].slice(0,a);return[u,s,c,l]}function Tn(e,t,n){const r=t.rank>1?t.shape[t.rank-1]:1,o=t.rank>1?t.rank-1:1,a="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+n.shape+`, indices.shape: ${t.shape}, shape: ${e}`+`, sliceDim: ${r}, and batchDim: ${o}.`;if(n.rank<o)throw new Error(a+` update.rank < ${o}. `);if(e.length<r+(n.rank-o))throw new Error(a+" Output shape length < "+(r+(n.rank-o)));if(n.rank!==o+e.length-r)throw new Error(a+" update.rank != "+(o+e.length-r));for(let e=0;e<o;++e)if(n.shape[e]!==t.shape[e])throw new Error(a+` updates.shape[${e}] (${n.shape[e]}) != indices.shape[${e}] (${t.shape[e]}).`);for(let t=0;t<n.rank-o;++t)if(n.shape[t+o]!==e[t+r])throw new Error(a+` updates.shape[${t+o}] (${n.shape[t+o]}) != shape[${t+o}] (${e[t+o]})`)}function An(e,t,n){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if("int32"!==t.dtype)throw new Error("The dtype of 'indices' should be int32, but got dtype: "+t.dtype);if(n.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+n);if(0===n.length){if(0===t.size)throw new Error("Indices specified for empty output. indices shape: "+t.shape);if(0===e.size)throw new Error("Updates specified for empty output. updates shape: "+e.shape)}Tn(n,t,e)}function Nn(e,t,n){const r=t.shape.length,o=r>1?t.shape[r-1]:1,a=n.length;let s=1;for(let e=o;e<a;++e)s*=n[e];const i=o<1?1:o;return{sliceRank:o,numUpdates:Object(b.O)(t.shape)/i,sliceSize:s,strides:[...Object(b.j)(n.slice(0,o)),1],outputSize:Object(b.O)(n)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fn=1.7580993408473768,_n=1.0507009873554805,Dn=.3275911,Ln=.254829592,Pn=-.284496736,Bn=1.421413741,Mn=-1.453152027,jn=1.061405429;
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Un(...e){Object(c.b)().getBool("IS_TEST")||console.warn(...e)}function Wn(...e){Object(c.b)().getBool("IS_TEST")||console.log(...e)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vn(e,t){if(e.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);const n=new Float32Array(2*e.length);for(let r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function zn(e){const t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let r=0;r<e.length;r+=2)t[r/2]=e[r],n[r/2]=e[r+1];return{real:t,imag:n}}function Gn(e){const t=Math.ceil(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=0;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function Hn(e){const t=Math.floor(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let t=2;t<e.length;t+=4)n[Math.floor(t/4)]=e[t],r[Math.floor(t/4)]=e[t+1];return{real:n,imag:r}}function Xn(e,t){return{real:e[2*t],imag:e[2*t+1]}}function Kn(e,t,n,r){e[2*r]=t,e[2*r+1]=n}function qn(e,t){const n=new Float32Array(e/2),r=new Float32Array(e/2);for(let o=0;o<Math.ceil(e/2);o++){const a=(t?2:-2)*Math.PI*(o/e);n[o]=Math.cos(a),r[o]=Math.sin(a)}return{real:n,imag:r}}function Yn(e,t,n){const r=(n?2:-2)*Math.PI*(e/t);return{real:Math.cos(r),imag:Math.sin(r)}}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qn=/->/g;function Zn(e,t){const n=((e=e.replace(/\s/g,"")).length-e.replace(Qn,"").length)/"->".length;if(n<1)throw new Error("Equations without an arrow are not supported.");if(n>1)throw new Error('Equation must contain exactly one arrow ("->").');const[r,o]=e.split("->");Object(b.b)(-1===r.indexOf("..."),()=>'The ellipsis notation ("...") is not supported yet.');const a=r.split(","),s=a.length;if(t!==s)throw new Error(`Expected ${s} input tensors, received ${t}`);if(s>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const i=[];for(let e=0;e<o.length;++e){const t=o[e];if(!a.some(e=>-1!==e.indexOf(t)))throw new Error(`Output subscripts contain the label ${t} not present in the input subscripts.`);-1===i.indexOf(t)&&i.push(t)}for(let e=0;e<r.length;++e){const t=r[e];-1===i.indexOf(t)&&","!==t&&i.push(t)}const u=new Array(a.length);for(let e=0;e<s;++e){if(new Set(a[e].split("")).size!==a[e].length)throw new Error(`Found duplicate axes in input component ${a[e]}. Support for duplicate axes in input is not implemented yet.`);u[e]=[];for(let t=0;t<a[e].length;++t)u[e].push(i.indexOf(a[e][t]))}const c=i.length,l=[];for(let e=o.length;e<c;++e)l.push(e);return{allDims:i,summedDims:l,idDims:u}}function Jn(e,t){let n=new Array(e);n.fill(-1);for(let e=0;e<t.length;++e)n[t[e]]=e;const r=[];for(let t=0;t<e;++t)-1===n[t]&&r.push(t);return n=n.filter(e=>-1!==e),{permutationIndices:n,expandDims:r}}function er(e,t,n){const r=new Array(e);for(let e=0;e<n.length;++e){const o=n[e].shape;for(let n=0;n<t[e].length;++n)void 0===r[t[e][n]]?r[t[e][n]]=o[n]:Object(b.b)(r[t[e][n]]===o[n],()=>`Expected dimension ${r[t[e][n]]} at axis ${n} of input shaped ${JSON.stringify(o)}, but got dimension `+o[n])}}function tr(e,t){const n=e,r=[];let o=0;0===e.length&&n.push(-1),o=e.length+1;for(let e=0;e<o;++e)r.push([]);const a=[];for(let e=0;e<n.length;++e){const o=rr(t,n[e]);for(const t of o)-1===a.indexOf(t)&&(r[e].push(t),a.push(t))}return{path:n,steps:r}}function nr(e){return e.every((e,t)=>e===t)}function rr(e,t){const n=[];for(let r=0;r<e.length;++r)0!==e[r].length&&-1===e[r].indexOf(t)&&-1!==t||n.push(r);return n}function or(e,t,n=0){let r=[];if("number"==typeof t)Object(b.b)(e.shape[n]%t==0,()=>"Number of splits must evenly divide the axis."),r=new Array(t).fill(e.shape[n]/t);else{const o=t.reduce((e,t)=>(-1===t&&(e+=1),e),0);Object(b.b)(o<=1,()=>"There should be only one negative value in split array.");const a=t.indexOf(-1);if(-1!==a){const r=t.reduce((e,t)=>t>0?e+t:e);t[a]=e.shape[n]-r}Object(b.b)(e.shape[n]===t.reduce((e,t)=>e+t),()=>"The sum of sizes must match the size of the axis dimension."),r=t}return r}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ar(e,t){let n,r=!1;for(e<=wn?(n=e,r=!0):n=Object(b.G)(e,Math.floor(Math.sqrt(e)));!r;)n>t||n===e?r=!0:n=Object(b.G)(e,n+1);return n}function sr(e,t,n){const r=[],o=e.length;for(let a=0;a<o;a++)a!==t?r.push(e[a]):r.push(n);return r}function ir(e,t,n,r){const o=t.shape.length,a=e.shape.length;if(0!==r&&(r<-o||r>o))throw new Error(`Expect batchDims in the range of [-${o}, ${o}], but got ${r}`);if(r<0&&(r+=o),r>a)throw new Error(`batchDims (${r}) must be less than rank(x) (\n    ${a}).`);if(n<r)throw new Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let n=0;n<r;++n)if(e.shape[n]!==t.shape[n])throw new Error(`x.shape[${n}]: ${e.shape[n]} should be equal to indices.shape[${n}]: ${t.shape[n]}.`);const s=e.shape[n],i=[];let u=1,c=1,l=1;for(let t=0;t<r;++t)i.push(e.shape[t]),u*=e.shape[t];for(let t=r;t<n;t++)i.push(e.shape[t]),c*=e.shape[t];for(let e=r;e<o;e++)i.push(t.shape[e]);for(let t=n+1;t<a;t++)i.push(e.shape[t]),l*=e.shape[t];return{batchSize:u,sliceSize:l,outerSize:c,dimSize:s,outputShape:i}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ur(e){try{return e.map(e=>Object(ce.decodeString)(e))}catch(e){throw new Error("Failed to decode encoded string bytes into utf-8, error: "+e)}}function cr(e){return e.map(e=>Object(ce.encodeString)(e))}var lr=n(19);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dr(e,t){const n=[];for(let e=0;e<t.length;e++)t[e]&&n.push(e);const r=N(e,"int32"),o=N([n.length,e.length],"int32");for(let t=0;t<n.length;t++){const a=r.indexToLoc(n[t]),s=t*e.length;o.values.set(a,s)}return o.toTensor()}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var hr=n(17);
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pr={},fr={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function gr(e){if(!(e in pr)){const t=function(e){if(1!==e&&2!==e)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");const t=function(e){if("undefined"!=typeof OffscreenCanvas&&2===e)return new OffscreenCanvas(300,150);if("undefined"!=typeof document)return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}(e);if(t.addEventListener("webglcontextlost",t=>{t.preventDefault(),delete pr[e]},!1),1===e)return t.getContext("webgl",fr)||t.getContext("experimental-webgl",fr);return t.getContext("webgl2",fr)}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e);if(null===t)return console.log("Could not get context for WebGL version",e),null;pr[e]=t}const t=pr[e];return t.isContextLost()?(delete pr[e],gr(e)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),pr[e])}var mr,br,xr;function yr(e,t){return[t,e]}function vr(e){const t=ce.sizeFromShape(e),n=Math.ceil(t/4);return ce.sizeToSquarishShape(n)}function wr(e,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(e/2))]}function Cr(e,t){const n=e;let r,o,a,s,i,u,l,d,h,p;return 2===Object(c.b)().getNumber("WEBGL_VERSION")?(r=n.R32F,o=n.R16F,a=n.RGBA16F,s=n.RGBA32F,i=n.RED,l=4,d=1,h=n.HALF_FLOAT,p=n.FLOAT):(r=e.RGBA,o=e.RGBA,a=e.RGBA,s=n.RGBA,i=e.RGBA,l=4,d=4,h=null!=t?t.HALF_FLOAT_OES:null,p=e.FLOAT),u=e.RGBA,{internalFormatFloat:r,internalFormatHalfFloat:o,internalFormatPackedHalfFloat:a,internalFormatPackedFloat:s,textureFormatFloat:i,downloadTextureFormat:u,downloadUnpackNumChannels:l,defaultNumChannels:d,textureTypeHalfFloat:h,textureTypeFloat:p}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $r(e,t){const n=t();return Object(c.b)().getBool("DEBUG")&&function(e){const t=e.getError();if(t!==e.NO_ERROR)throw new Error("WebGL Error: "+function(e,t){switch(t){case e.NO_ERROR:return"NO_ERROR";case e.INVALID_ENUM:return"INVALID_ENUM";case e.INVALID_VALUE:return"INVALID_VALUE";case e.INVALID_OPERATION:return"INVALID_OPERATION";case e.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case e.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case e.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"Unknown error code "+t}}(e,t))}(e),n}!function(e){e[e.DENSE=0]="DENSE",e[e.SHARED_BATCH=1]="SHARED_BATCH"}(mr||(mr={})),function(e){e[e.RENDER=0]="RENDER",e[e.UPLOAD=1]="UPLOAD",e[e.PIXELS=2]="PIXELS",e[e.DOWNLOAD=3]="DOWNLOAD"}(br||(br={})),function(e){e[e.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",e[e.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",e[e.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",e[e.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",e[e.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"}(xr||(xr={}));function Ir(e){return!!(Object(c.b)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||0===e||5.96e-8<Math.abs(e)&&Math.abs(e)<65504)}function kr(e,t){return _r(e,()=>e.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function Er(e,t){const n=_r(e,()=>e.createShader(e.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if($r(e,()=>e.shaderSource(n,t)),$r(e,()=>e.compileShader(n)),!1===e.getShaderParameter(n,e.COMPILE_STATUS))throw function(e,t){const n=Rr.exec(t);if(null==n)return console.log("Couldn't parse line number in error: "+t),void console.log(e);const r=+n[1],o=e.split("\n"),a=o.length.toString().length+2,s=o.map((e,t)=>ce.rightPad((t+1).toString(),a)+e);let i=0;for(let e=0;e<s.length;e++)i=Math.max(s[e].length,i);const u=s.slice(0,r-1),c=s.slice(r-1,r),l=s.slice(r);console.log(u.join("\n")),console.log(t.split("\n")[0]),console.log("%c "+ce.rightPad(c[0],i),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(l.join("\n"))}(t,e.getShaderInfoLog(n)),new Error("Failed to compile fragment shader.");return n}const Rr=/ERROR: [0-9]+:([0-9]+):/g;function Or(e,t){if($r(e,()=>e.validateProgram(t)),!1===e.getProgramParameter(t,e.VALIDATE_STATUS))throw console.log(e.getProgramInfoLog(t)),new Error("Shader program validation failed.")}function Sr(e,t,n,r,o,a,s){const i=e.getAttribLocation(t,n);return-1!==i&&($r(e,()=>e.bindBuffer(e.ARRAY_BUFFER,r)),$r(e,()=>e.vertexAttribPointer(i,o,e.FLOAT,!1,a,s)),$r(e,()=>e.enableVertexAttribArray(i)),!0)}function Tr(e,t,n,r){$r(e,()=>function(e,t,n){Dr(e,n),$r(e,()=>e.activeTexture(e.TEXTURE0+n)),$r(e,()=>e.bindTexture(e.TEXTURE_2D,t))}(e,t,r)),$r(e,()=>e.uniform1i(n,r))}function Ar(e,t,n){$r(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,n)),$r(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0))}function Nr(e,t){$r(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,t)),$r(e,()=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0))}function Fr(e){const t=e.checkFramebufferStatus(e.FRAMEBUFFER);if(t!==e.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+function(e,t){switch(t){case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case e.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return"unknown error "+t}}(e,t))}function _r(e,t,n){const r=$r(e,()=>t());if(null==r)throw new Error(n);return r}function Dr(e,t){const n=e.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=t+e.TEXTURE0;if(r<e.TEXTURE0||r>n){throw new Error(`textureUnit must be in ${`[gl.TEXTURE0, gl.TEXTURE${n}]`}.`)}}function Lr(e,t=2){return ce.sizeFromShape(e.slice(0,e.length-t))}function Pr(e){if(0===e.length)throw Error("Cannot get rows and columns of an empty shape array.");return[e.length>1?e[e.length-2]:1,e[e.length-1]]}function Br(e){let t=[1,1,1];return 0===e.length||1===e.length&&1===e[0]||(t=[Lr(e),...Pr(e)]),t}function Mr(e){return e%2==0}function jr(e,t){if(e=e.slice(-2),t=t.slice(-2),ce.arraysEqual(e,t))return!0;if(!e.length||!t.length)return!0;if(0===e[0]||0===e[1]||0===t[0]||0===t[1])return!0;if(e.length!==t.length){const n=e.slice(-1)[0],r=t.slice(-1)[0];if(n===r)return!0;if(Mr(n)&&Mr(r)&&(1===e[0]||1===t[0]))return!0}return e[1]===t[1]&&Mr(e[0])&&Mr(t[0])}let Ur,Wr;function Vr(e,t){return null!=e.getExtension(t)}function zr(e){try{if(null!=gr(e))return!0}catch(e){return console.log("Error when getting WebGL context: ",e),!1}return!1}function Gr(e){if(0===e)return!1;const t=gr(e);if(1!==e){if(Vr(t,"EXT_color_buffer_float"))return Hr(t);const e="EXT_color_buffer_half_float";if(Vr(t,e)){const n=t.getExtension(e);return function(e,t){const n=Cr(e,t),r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);e.texImage2D(e.TEXTURE_2D,0,n.internalFormatHalfFloat,1,1,0,n.textureFormatFloat,n.textureTypeHalfFloat,null);const o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);const a=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),a}(t,n)}return!1}if(!Vr(t,"OES_texture_float"))return!1;if(!Vr(t,"WEBGL_color_buffer_float"))return!1;return Hr(t)}function Hr(e){const t=Cr(e),n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);e.texImage2D(e.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);const r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);const o=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(r),o}function Xr(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&ce.assert("complex64"!==e.dtype,()=>t+" does not support complex64 tensors in the WebGL backend.")})}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kr=Object(c.b)();
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function qr(){let e,t,n,r,o,a,s,i,u,l;return 2===Object(c.b)().getNumber("WEBGL_VERSION")?(e="#version 300 es",t="in",n="out",r="in",o="texture",a="outputColor",s="out vec4 outputColor;",i="\n      bool isnan_custom(float val) {\n        return (val > 0.0 || val < 0.0) ? false : val != 0.0;\n      }\n\n      bvec4 isnan_custom(vec4 val) {\n        return bvec4(isnan_custom(val.x),\n          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));\n      }\n\n      #define isnan(value) isnan_custom(value)\n    ",u="",l="\n      #define round(value) newRound(value)\n      int newRound(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 newRound(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    "):(e="",t="attribute",n="varying",r="varying",o="texture2D",a="gl_FragColor",s="",i="\n      #define isnan(value) isnan_custom(value)\n      bool isnan_custom(float val) {\n        return (val > 0. || val < 1. || val == 0.) ? false : true;\n      }\n      bvec4 isnan_custom(vec4 val) {\n        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));\n      }\n    ",u="\n      uniform float INFINITY;\n\n      bool isinf(float val) {\n        return abs(val) == INFINITY;\n      }\n      bvec4 isinf(vec4 val) {\n        return equal(abs(val), vec4(INFINITY));\n      }\n    ",l="\n      int round(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 round(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    "),{version:e,attribute:t,varyingVs:n,varyingFs:r,texture2D:o,output:a,defineOutput:s,defineSpecialNaN:i,defineSpecialInf:u,defineRound:l}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yr(e,t,n="index"){const r=ce.computeStrides(t);return r.map((t,o)=>`${`int ${e[o]} = ${n} / ${t}`}; ${o===r.length-1?`int ${e[o+1]} = ${n} - ${e[o]} * ${t}`:`index -= ${e[o]} * ${t}`};`).join("")}function Qr(e){const t=ce.computeStrides(e).map(e=>e.toString());return`\n  int getFlatIndex(ivec3 coords) {\n    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;\n  }\n`}Kr.registerFlag("HAS_WEBGL",()=>Kr.getNumber("WEBGL_VERSION")>0),Kr.registerFlag("WEBGL_VERSION",()=>zr(2)?2:zr(1)?1:0),Kr.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),Kr.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>2===Kr.get("WEBGL_VERSION")),Kr.registerFlag("WEBGL_CPU_FORWARD",()=>!0),Kr.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),Kr.registerFlag("WEBGL_PACK",()=>Kr.getBool("HAS_WEBGL")),Kr.registerFlag("WEBGL_PACK_NORMALIZATION",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_PACK_CLIP",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_PACK_REDUCE",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_LAZILY_UNPACK",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_CONV_IM2COL",()=>Kr.getBool("WEBGL_PACK")),Kr.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>function(e){if(null==Ur){const t=gr(e);Ur=t.getParameter(t.MAX_TEXTURE_SIZE)}return Ur}(Kr.getNumber("WEBGL_VERSION"))),Kr.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>function(e){if(null==Wr){const t=gr(e);Wr=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,Wr)}(Kr.getNumber("WEBGL_VERSION"))),Kr.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{const e=Kr.getNumber("WEBGL_VERSION");return 0===e?0:function(e){if(0===e)return 0;let t;const n=gr(e);return t=Vr(n,"EXT_disjoint_timer_query_webgl2")&&2===e?2:Vr(n,"EXT_disjoint_timer_query")?1:0,t}(e)}),Kr.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>Kr.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!lr.isMobile()),Kr.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>function(e){if(0===e)return!1;const t=gr(e);if(1===e){if(!Vr(t,"OES_texture_float"))return!1}else if(!Vr(t,"EXT_color_buffer_float"))return!1;return Hr(t)}(Kr.getNumber("WEBGL_VERSION"))),Kr.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>!Kr.getBool("WEBGL_FORCE_F16_TEXTURES")&&Kr.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),Kr.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>Gr(Kr.getNumber("WEBGL_VERSION"))),Kr.registerFlag("WEBGL_FENCE_API_ENABLED",()=>{return 2===(e=Kr.getNumber("WEBGL_VERSION"))&&null!=gr(e).fenceSync;var e}),Kr.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>Kr.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0),Kr.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,e=>{if(e<0&&-1!==e)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${e}.`)}),Kr.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>lr.isMobile()&&Kr.getBool("IS_CHROME")?1:-1,e=>{if(e<0&&-1!==e)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${e}.`)});const Zr="\n  const float FLOAT_MAX = 1.70141184e38;\n  const float FLOAT_MIN = 1.17549435e-38;\n\n  lowp vec4 encode_float(highp float v) {\n    if (isnan(v)) {\n      return vec4(255, 255, 255, 255);\n    }\n\n    highp float av = abs(v);\n\n    if(av < FLOAT_MIN) {\n      return vec4(0.0, 0.0, 0.0, 0.0);\n    } else if(v > FLOAT_MAX) {\n      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;\n    } else if(v < -FLOAT_MAX) {\n      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;\n    }\n\n    highp vec4 c = vec4(0,0,0,0);\n\n    highp float e = floor(log2(av));\n    highp float m = exp2(fract(log2(av))) - 1.0;\n\n    c[2] = floor(128.0 * m);\n    m -= c[2] / 128.0;\n    c[1] = floor(32768.0 * m);\n    m -= c[1] / 32768.0;\n    c[0] = floor(8388608.0 * m);\n\n    highp float ebias = e + 127.0;\n    c[3] = floor(ebias / 2.0);\n    ebias -= c[3] * 2.0;\n    c[2] += floor(ebias) * 128.0;\n\n    c[3] += 128.0 * step(0.0, -v);\n\n    return c / 255.0;\n  }\n";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Jr{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=mr.DENSE;const t=vr(e),n=qr();this.outputShape=e,this.userCode=`\n      ivec3 outCoordsFromFlatIndex(int index) {\n        ${Yr(["r","c","d"],e)}\n        return ivec3(r, c, d);\n      }\n\n      void main() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n          vec2(${t[0]}, ${t[1]}));\n        int index = 4 * (resTexRC.x * ${t[1]} + resTexRC.y);\n\n        vec4 result = vec4(0.);\n\n        for (int i=0; i<4; i++) {\n          int flatIndex = index + i;\n          ivec3 rc = outCoordsFromFlatIndex(flatIndex);\n          result[i] = getA(rc.x, rc.y, rc.z);\n        }\n\n        ${n.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class eo{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=mr.DENSE;const t=vr(e),n=qr();this.outputShape=e,this.userCode=`\n      ivec3 outCoordsFromFlatIndex(int index) {\n        ${Yr(["r","c","d"],e)}\n        return ivec3(r, c, d);\n      }\n\n      void main() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n          vec2(${t[0]}, ${t[1]}));\n        int index = 4 * (resTexRC.x * ${t[1]} + resTexRC.y);\n\n        vec4 result = vec4(0.);\n\n        for (int i=0; i<4; i++) {\n          int flatIndex = index + i;\n          ivec3 rc = outCoordsFromFlatIndex(flatIndex);\n          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));\n        }\n\n        ${n.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class to{constructor(e){this.variableNames=["A"],this.outTexUsage=br.DOWNLOAD;const t=qr();this.outputShape=e,this.userCode=`\n      ${Zr}\n\n      void main() {\n        float x = getAAtOutCoords();\n        ${t.output} = encode_float(x);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class no{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=br.DOWNLOAD;const t=qr();this.outputShape=e,this.userCode=`\n      ${Zr}\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));\n        ${t.output} = encode_float(x);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ro{constructor(e,t,n=!1){this.variableNames=["A"];const r=qr(),[o,a]=t;this.outputShape=e;let s="result";n&&(s="floor(result * 255. + 0.5)"),this.userCode=`\n      ${Qr(e)}\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n\n        int flatIndex = getFlatIndex(coords);\n        int offset = imod(flatIndex, 4);\n\n        flatIndex = idiv(flatIndex, 4, 1.);\n\n        int r = flatIndex / ${a};\n        int c = imod(flatIndex, ${a});\n        vec2 uv = (vec2(c, r) + halfCR) / vec2(${a}.0, ${o}.0);\n        vec4 values = ${r.texture2D}(A, uv);\n\n        float result;\n\n        if(offset == 0) {\n          result = values[0];\n        } else if(offset == 1) {\n          result = values[1];\n        } else if(offset == 2) {\n          result = values[2];\n        } else {\n          result = values[3];\n        }\n\n        ${r.output} = vec4(${s}, 0., 0., 0.);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class oo{constructor(e,t,n=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;const r=qr(),[o,a]=t;this.outputShape=e;let s="",i="result";n&&(i="floor(result * 255. + 0.5)");for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){const i=2*t+n;s+=`\n          localCoords = coords;\n          if(localCoords[2] + ${n} < ${e[2]}) {\n            localCoords[2] += ${n};\n            if(localCoords[1] + ${t} < ${e[1]}) {\n              localCoords[1] += ${t};\n\n              flatIndex = getFlatIndex(localCoords);\n              offset = imod(flatIndex, 4);\n\n              flatIndex = idiv(flatIndex, 4, 1.);\n\n              r = flatIndex / ${a};\n              c = imod(flatIndex, ${a});\n              uv = (vec2(c, r) + halfCR) / vec2(${a}.0, ${o}.0);\n              values = ${r.texture2D}(A, uv);\n\n              if(offset == 0) {\n                result[${i}] = values[0];\n              } else if(offset == 1) {\n                result[${i}] = values[1];\n              } else if(offset == 2) {\n                result[${i}] = values[2];\n              } else {\n                result[${i}] = values[3];\n              }\n            }\n          }\n        `}this.userCode=`\n      ${Qr(e)}\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n\n        vec4 result = vec4(0.);\n        int flatIndex, r, c, offset;\n        ivec3 localCoords;\n        vec2 uv;\n        vec4 values;\n\n        ${s}\n\n        ${r.output} = ${i};\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ao(e){const t=qr();return function(e,t){const n=_r(e,()=>e.createShader(e.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if($r(e,()=>e.shaderSource(n,t)),$r(e,()=>e.compileShader(n)),!1===e.getShaderParameter(n,e.COMPILE_STATUS))throw console.log(e.getShaderInfoLog(n)),new Error("Failed to compile vertex shader.");return n}(e,`${t.version}\n    precision highp float;\n    ${t.attribute} vec3 clipSpacePos;\n    ${t.attribute} vec2 uv;\n    ${t.varyingVs} vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }`)}function so(e){return function(e,t){const n=_r(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return $r(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),$r(e,()=>e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)),n}(e,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function io(e){return function(e,t){const n=_r(e,()=>e.createBuffer(),"Unable to create WebGLBuffer");return $r(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n)),$r(e,()=>e.bufferData(e.ELEMENT_ARRAY_BUFFER,t,e.STATIC_DRAW)),n}(e,new Uint16Array([0,1,2,2,1,3]))}function uo(e,t,n,r,o,a){!function(e,t){const n=Object(c.b)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e<=0||t<=0){throw new Error("Requested texture size "+`[${e}x${t}]`+" is invalid.")}if(e>n||t>n){throw new Error("Requested texture size "+`[${e}x${t}]`+" greater than WebGL maximum on this browser / GPU "+`[${n}x${n}]`+".")}}(t,n);const s=function(e){return _r(e,()=>e.createTexture(),"Unable to create WebGLTexture.")}(e),i=e.TEXTURE_2D;return $r(e,()=>e.bindTexture(i,s)),$r(e,()=>e.texParameteri(i,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE)),$r(e,()=>e.texParameteri(i,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),$r(e,()=>e.texParameteri(i,e.TEXTURE_MIN_FILTER,e.NEAREST)),$r(e,()=>e.texParameteri(i,e.TEXTURE_MAG_FILTER,e.NEAREST)),$r(e,()=>e.texImage2D(i,0,r,t,n,0,o,a,null)),$r(e,()=>e.bindTexture(e.TEXTURE_2D,null)),s}function co(e){return e.internalFormatFloat}function lo(e){return e.internalFormatHalfFloat}function ho(e){return e.downloadTextureFormat}function po(e){return e.internalFormatPackedFloat}function fo(e){return e.internalFormatPackedHalfFloat}function go(e,t,n,r,o,a,s,i){const u=e,c=new Float32Array(function(e,t){const[n,r]=wr(e,t);return n*r*4}(a,s));return u.bindBuffer(u.PIXEL_PACK_BUFFER,t),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,c),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),c}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class mo{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];const t=Object(c.b)().getNumber("WEBGL_VERSION");null!=e?(this.gl=e,function(e,t){pr[e]=t}(t,e)):this.gl=gr(t);let n="WEBGL_color_buffer_float";if(1===Object(c.b)().getNumber("WEBGL_VERSION")){const e="OES_texture_float",t="OES_texture_half_float";if(this.textureFloatExtension=kr(this.gl,e),Vr(this.gl,t))this.textureHalfFloatExtension=kr(this.gl,t);else if(Object(c.b)().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(n),Vr(this.gl,"EXT_color_buffer_half_float"))this.colorBufferHalfFloatExtension=kr(this.gl,"EXT_color_buffer_half_float");else if(Object(c.b)().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(n="EXT_color_buffer_float",Vr(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else{if(!Vr(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float")}this.vertexBuffer=so(this.gl),this.indexBuffer=io(this.gl),this.framebuffer=function(e){return _r(e,()=>e.createFramebuffer(),"Unable to create WebGLFramebuffer.")}(this.gl),this.textureConfig=Cr(this.gl,this.textureHalfFloatExtension)}get debug(){return Object(c.b)().getBool("DEBUG")}dispose(){if(this.disposed)return;null!=this.program&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),null!=this.outputTexture&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");const e=this.gl;$r(e,()=>e.finish()),$r(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),$r(e,()=>e.deleteFramebuffer(this.framebuffer)),$r(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),$r(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),$r(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=yr(t,n);return uo(e,o,a,co(r),r.textureFormatFloat,e.FLOAT)}(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=yr(t,n);return uo(e,o,a,lo(r),r.textureFormatFloat,r.textureTypeHalfFloat)}(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=yr(t,n);return uo(e,o,a,ho(r),e.RGBA,e.UNSIGNED_BYTE)}(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),function(e,t,n){$r(e,()=>e.bindTexture(e.TEXTURE_2D,t)),n.data instanceof Uint8Array?$r(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data)):$r(e,()=>e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n)),$r(e,()=>e.bindTexture(e.TEXTURE_2D,null))}(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,n,r){this.throwIfDisposed(),function(e,t,n,r,o,a){let s,i,u;$r(e,()=>e.bindTexture(e.TEXTURE_2D,t)),o instanceof Uint8Array?(s=new Uint8Array(n*r*4),i=e.UNSIGNED_BYTE,u=e.RGBA):(s=new Float32Array(n*r*4),i=e.FLOAT,u=a.internalFormatPackedFloat),s.set(o),$r(e,()=>e.texImage2D(e.TEXTURE_2D,0,u,n,r,0,e.RGBA,i,s)),$r(e,()=>e.bindTexture(e.TEXTURE_2D,null))}(this.gl,e,t,n,r,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=wr(t,n);return uo(e,o,a,fo(r),e.RGBA,r.textureTypeHalfFloat)}(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),function(e,t,n,r){const[o,a]=wr(t,n);return uo(e,o,a,po(r),e.RGBA,e.FLOAT)}(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(Nr(this.gl,this.framebuffer),this.outputTexture=null),$r(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,n){return this.downloadMatrixDriver(e,()=>function(e,t,n,r){const[o,a]=yr(t,n),s=new Uint8Array(t*n*4);return $r(e,()=>e.readPixels(0,0,o,a,r.downloadTextureFormat,e.UNSIGNED_BYTE,s)),new Float32Array(s.buffer)}(this.gl,t,n,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,n,r,o,a){return go(this.gl,e,0,0,0,o,a,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return function(e,t,n){const r=e,o=new Float32Array(n);return r.bindBuffer(r.PIXEL_PACK_BUFFER,t),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,o),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),o}(this.gl,e,t)}createBufferFromTexture(e,t,n){this.bindTextureToFrameBuffer(e);const r=function(e,t,n,r){const o=e.createBuffer();$r(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,o));const a=16*t*n;return $r(e,()=>e.bufferData(e.PIXEL_PACK_BUFFER,a,e.STREAM_READ)),$r(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,0)),$r(e,()=>e.bindBuffer(e.PIXEL_PACK_BUFFER,null)),o}(this.gl,t,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),r}createAndWaitForFence(){const e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,n;if(Object(c.b)().getBool("WEBGL_FENCE_API_ENABLED")){const r=e,o=r.fenceSync(r.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),n=()=>{const e=r.clientWaitSync(o,0,0);return e===r.ALREADY_SIGNALED||e===r.CONDITION_SATISFIED},t=o}else Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),n=()=>this.isQueryAvailable(t,Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):n=()=>!0;return{query:t,isFencePassed:n}}downloadMatrixFromPackedTexture(e,t,n){return this.downloadMatrixDriver(e,()=>function(e,t,n){const r=new Float32Array(t*n*4);return $r(e,()=>e.readPixels(0,0,n,t,e.RGBA,e.FLOAT,r)),r}(this.gl,t,n))}createProgram(e){this.throwIfDisposed();const t=this.gl,n=Er(t,e);null==this.vertexShader&&(this.vertexShader=ao(t));const r=function(e){return _r(e,()=>e.createProgram(),"Unable to create WebGLProgram.")}(t);return $r(t,()=>t.attachShader(r,this.vertexShader)),$r(t,()=>t.attachShader(r,n)),function(e,t){if($r(e,()=>e.linkProgram(t)),!1===e.getProgramParameter(t,e.LINK_STATUS))throw console.log(e.getProgramInfoLog(t)),new Error("Failed to link vertex and fragment shaders.")}(t,r),this.debug&&Or(t,r),this.vertexAttrsAreBound||(this.setProgram(r),this.vertexAttrsAreBound=function(e,t,n){return $r(e,()=>e.bindBuffer(e.ARRAY_BUFFER,n)),Sr(e,t,"clipSpacePos",n,3,20,0)&&Sr(e,t,"uv",n,2,20,12)}(t,this.program,this.vertexBuffer)),r}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),null!=e&&$r(this.gl,()=>this.gl.deleteProgram(e))}setProgram(e){this.throwIfDisposed(),this.program=e,null!=this.program&&this.debug&&Or(this.gl,this.program),$r(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,n=!0){return this.throwIfDisposed(),n?function(e,t,n){return _r(e,()=>e.getUniformLocation(t,n),'uniform "'+n+'" not present in program.')}(this.gl,e,t):function(e,t,n){return e.getUniformLocation(t,n)}(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),$r(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,n){this.throwIfDisposed(),this.throwIfNoProgram(),Tr(this.gl,e,t,n)}setOutputMatrixTexture(e,t,n){this.setOutputMatrixTextureDriver(e,n,t)}setOutputPackedMatrixTexture(e,t,n){this.throwIfDisposed();const[r,o]=wr(t,n);this.setOutputMatrixTextureDriver(e,r,o)}setOutputMatrixWriteRegion(e,t,n,r){this.setOutputMatrixWriteRegionDriver(n,e,r,t)}setOutputPackedMatrixWriteRegion(e,t,n,r){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){null!=this.program&&Or(this.gl,this.program),Fr(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();const e=this.gl;this.debug&&this.debugValidate(),$r(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),$r(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return null==this.disjointQueryTimerExtension&&(this.disjointQueryTimerExtension=kr(this.gl,2===Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(2===Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){const e=this.gl,t=this.getQueryTimerExtensionWebGL2(),n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}const e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(2===Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){const e=this.gl,t=this.getQueryTimerExtensionWebGL2();return void e.endQuery(t.TIME_ELAPSED_EXT)}const e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(e){return await ce.repeatedTry(()=>this.disposed||this.isQueryAvailable(e,Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(e,t){if(0===t)return null;if(2===t){const t=this.gl;return t.getQueryParameter(e,t.QUERY_RESULT)/1e6}{const t=this.getQueryTimerExtensionWebGL1();return t.getQueryObjectEXT(e,t.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(0===t)return!0;if(2===t){const t=this.gl,n=this.getQueryTimerExtensionWebGL2(),r=t.getQueryParameter(e,t.QUERY_RESULT_AVAILABLE);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),r&&!this.disjoint}{const t=this.getQueryTimerExtensionWebGL1(),n=t.getQueryObjectEXT(e,t.QUERY_RESULT_AVAILABLE_EXT);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(t.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){const e=function(e){let t=0;for(;t<e.length;++t){if(!e[t]())break}return t-1}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(this.itemsToPoll.map(e=>e.isDoneFn));for(let t=0;t<=e;++t){const{resolveFn:e}=this.itemsToPoll[t];e()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||ce.repeatedTry(()=>(this.pollItems(),0===this.itemsToPoll.length))}bindTextureToFrameBuffer(e){this.throwIfDisposed(),Ar(this.gl,e,this.framebuffer),this.debug&&Fr(this.gl)}unbindTextureToFrameBuffer(){null!=this.outputTexture?(Ar(this.gl,this.outputTexture,this.framebuffer),this.debug&&Fr(this.gl)):Nr(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);const n=t();return this.unbindTextureToFrameBuffer(),n}setOutputMatrixTextureDriver(e,t,n){this.throwIfDisposed();const r=this.gl;Ar(r,e,this.framebuffer),this.debug&&Fr(r),this.outputTexture=e,$r(r,()=>r.viewport(0,0,t,n)),$r(r,()=>r.scissor(0,0,t,n))}setOutputMatrixWriteRegionDriver(e,t,n,r){this.throwIfDisposed(),$r(this.gl,()=>this.gl.scissor(e,t,n,r))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(null==this.program)throw new Error("No GPU program is currently set.")}}const{getBroadcastDims:bo}=a;function xo(e,t,n,r){const o=[];e.forEach(e=>{const t=ce.sizeFromShape(e.shapeInfo.logicalShape);e.shapeInfo.isUniform?o.push(`uniform float ${e.name}${t>1?`[${t}]`:""};`):(o.push(`uniform sampler2D ${e.name};`),o.push(`uniform int offset${e.name};`))});const a=o.join("\n"),s=e.map(e=>function(e,t,n=!1){let r="";r+=n?vo(e):yo(e);const o=e.shapeInfo.logicalShape,a=t.logicalShape;o.length<=a.length&&(r+=n?function(e,t){const n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),o="get"+r+"AtOutCoords",a=e.shapeInfo.logicalShape.length,s=t.logicalShape.length,i=bo(e.shapeInfo.logicalShape,t.logicalShape),u=Oo(s),c=s-a;let l;const d=["x","y","z","w","u","v"];l=0===a?"":s<2&&i.length>=1?"coords = 0;":i.map(e=>`coords.${d[e+c]} = 0;`).join("\n");let h="";h=s<2&&a>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>"coords."+d[t+c]).join(", ");let p="return outputValue;";const f=1===ce.sizeFromShape(e.shapeInfo.logicalShape),g=1===ce.sizeFromShape(t.logicalShape);if(1!==a||f||g){if(f&&!g)p=1===s?"\n        return vec4(outputValue.x, outputValue.x, 0., 0.);\n      ":"\n        return vec4(outputValue.x);\n      ";else if(i.length){const e=a-2,t=a-1;i.indexOf(e)>-1&&i.indexOf(t)>-1?p="return vec4(outputValue.x);":i.indexOf(e)>-1?p="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":i.indexOf(t)>-1&&(p="return vec4(outputValue.xx, outputValue.zz);")}}else p="\n      return vec4(outputValue.xy, outputValue.xy);\n    ";return`\n    vec4 ${o}() {\n      ${u} coords = getOutputCoords();\n      ${l}\n      vec4 outputValue = get${r}(${h});\n      ${p}\n    }\n  `}(e,t):function(e,t){const n=e.name,r=n.charAt(0).toUpperCase()+n.slice(1),o="get"+r+"AtOutCoords",a=t.texShape,s=e.shapeInfo.texShape,i=e.shapeInfo.logicalShape.length,u=t.logicalShape.length;if(!e.shapeInfo.isUniform&&i===u&&null==e.shapeInfo.flatOffset&&ce.arraysEqual(s,a))return`\n      float ${o}() {\n        return sampleTexture(${n}, resultUV);\n      }\n    `;const c=Oo(u),l=bo(e.shapeInfo.logicalShape,t.logicalShape),d=u-i;let h;const p=["x","y","z","w","u","v"];h=0===i?"":u<2&&l.length>=1?"coords = 0;":l.map(e=>`coords.${p[e+d]} = 0;`).join("\n");let f="";f=u<2&&i>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>"coords."+p[t+d]).join(", ");return`\n    float ${o}() {\n      ${c} coords = getOutputCoords();\n      ${h}\n      return get${r}(${f});\n    }\n  `}(e,t));return r}(e,t,r)).join("\n"),i=t.texShape,u=qr(),c=function(e){return`\n    float sampleTexture(sampler2D textureSampler, vec2 uv) {\n      return ${e.texture2D}(textureSampler, uv).r;\n    }\n  `}(u);let l,d,h=function(e){return`${e.version}\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    ${e.varyingFs} vec2 resultUV;\n    ${e.defineOutput}\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    uniform float NAN;\n    ${e.defineSpecialNaN}\n    ${e.defineSpecialInf}\n    ${e.defineRound}\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    int idiv(int a, int b, float sign) {\n      int res = a / b;\n      int mod = imod(a, b);\n      if (sign < 0. && mod != 0) {\n        res -= 1;\n      }\n      return res;\n    }\n\n    //Based on the work of Dave Hoskins\n    //https://www.shadertoy.com/view/4djSRW\n    #define HASHSCALE1 443.8975\n    float random(float seed){\n      vec2 p = resultUV * seed;\n      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);\n      p3 += dot(p3, p3.yzx + 19.19);\n      return fract((p3.x + p3.y) * p3.z);\n    }\n\n    ${wo}\n    ${Co}\n    ${$o}\n  `}(u);t.isPacked?(l=function(e,t){switch(e.length){case 0:return ko();case 1:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(1===n[0])return`\n      int getOutputCoords() {\n        return 2 * int(resultUV.x * ${n[1]}.0);\n      }\n    `;if(1===n[1])return`\n      int getOutputCoords() {\n        return 2 * int(resultUV.y * ${n[0]}.0);\n      }\n    `;return`\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      return 2 * (resTexRC.x * ${n[1]} + resTexRC.y);\n    }\n  `}(0,t);case 2:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(ce.arraysEqual(e,t))return`\n      ivec2 getOutputCoords() {\n        return 2 * ivec2(resultUV.yx * vec2(${n[0]}, ${n[1]}));\n      }\n    `;const r=Math.ceil(e[1]/2);return`\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n      int r = 2 * (index / ${r});\n      int c = imod(index, ${r}) * 2;\n\n      return ivec2(r, c);\n    }\n  `}(e,t);case 3:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],r=Math.ceil(e[2]/2),o=r*Math.ceil(e[1]/2);return`\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n\n      int b = index / ${o};\n      index -= b * ${o};\n\n      int r = 2 * (index / ${r});\n      int c = imod(index, ${r}) * 2;\n\n      return ivec3(b, r, c);\n    }\n  `}(e,t);default:return function(e,t){const n=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],r=Math.ceil(e[e.length-1]/2),o=r*Math.ceil(e[e.length-2]/2);let a=o,s="",i="b, r, c";for(let t=2;t<e.length-1;t++)a*=e[e.length-t-1],s=`\n      int b${t} = index / ${a};\n      index -= b${t} * ${a};\n    `+s,i=`b${t}, `+i;return`\n    ivec${e.length} getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${n[0]}, ${n[1]}));\n      int index = resTexRC.x * ${n[1]} + resTexRC.y;\n\n      ${s}\n\n      int b = index / ${o};\n      index -= b * ${o};\n\n      int r = 2 * (index / ${r});\n      int c = imod(index, ${r}) * 2;\n\n      return ivec${e.length}(${i});\n    }\n  `}(e,t)}}(t.logicalShape,i),d=function(e){return`\n    void setOutput(vec4 val) {\n      ${e.output} = val;\n    }\n  `}(u)):(l=function(e,t){switch(e.length){case 0:return ko();case 1:return function(e,t){if(1===t[0])return`\n      int getOutputCoords() {\n        return int(resultUV.x * ${t[1]}.0);\n      }\n    `;if(1===t[1])return`\n      int getOutputCoords() {\n        return int(resultUV.y * ${t[0]}.0);\n      }\n    `;return`\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${t[0]}, ${t[1]}));\n      return resTexRC.x * ${t[1]} + resTexRC.y;\n    }\n  `}(0,t);case 2:return function(e,t){if(ce.arraysEqual(e,t))return`\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));\n      }\n    `;if(1===e[1])return`\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(${t[0]}, ${t[1]}));\n        int index = resTexRC.x * ${t[1]} + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    `;if(1===e[0])return`\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(${t[0]}, ${t[1]}));\n        int index = resTexRC.x * ${t[1]} + resTexRC.y;\n        return ivec2(0, index);\n      }\n    `;return`\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n      int r = index / ${e[1]};\n      int c = index - r * ${e[1]};\n      return ivec2(r, c);\n    }\n  `}(e,t);case 3:return function(e,t){const n=Yr(["r","c","d"],e);return`\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n      ${n}\n      return ivec3(r, c, d);\n    }\n  `}(e,t);case 4:return function(e,t){const n=Yr(["r","c","d","d2"],e);return`\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n      ${n}\n      return ivec4(r, c, d, d2);\n    }\n  `}(e,t);case 5:return function(e,t){const n=Yr(["r","c","d","d2","d3"],e);return`\n    ivec5 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},\n                             ${t[1]}));\n\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n\n      ${n}\n\n      ivec5 outShape = ivec5(r, c, d, d2, d3);\n      return outShape;\n    }\n  `}(e,t);case 6:return function(e,t){const n=Yr(["r","c","d","d2","d3","d4"],e);return`\n    ivec6 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(${t[0]}, ${t[1]}));\n      int index = resTexRC.x * ${t[1]} + resTexRC.y;\n\n      ${n}\n\n      ivec6 result = ivec6(r, c, d, d2, d3, d4);\n      return result;\n    }\n  `}(e,t);default:throw new Error(e.length+"-D output sampling is not yet supported")}}(t.logicalShape,i),d=function(e){return`\n    void setOutput(float val) {\n      ${e.output} = vec4(val, 0, 0, 0);\n    }\n  `}(u)),r&&(h+=Io);return[h,c,d,a,l,s,n].join("\n")}function yo(e){const t=e.shapeInfo.logicalShape;switch(t.length){case 0:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1);if(e.shapeInfo.isUniform)return`float ${n}() {return ${t};}`;const[r,o]=e.shapeInfo.texShape;if(1===r&&1===o)return`\n      float ${n}() {\n        return sampleTexture(${t}, halfCR);\n      }\n    `;const[a,s]=e.shapeInfo.texShape,i=Eo(t);return`\n    float ${n}() {\n      vec2 uv = uvFromFlat(${a}, ${s}, ${i});\n      return sampleTexture(${t}, uv);\n    }\n  `}(e);case 1:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1);if(e.shapeInfo.isUniform)return`\n      float ${n}(int index) {\n        ${Ro(e)}\n      }\n    `;const r=e.shapeInfo.texShape,o=r[0],a=r[1];if(1===a&&1===o)return`\n      float ${n}(int index) {\n        return sampleTexture(${t}, halfCR);\n      }\n    `;const s=Eo(t);if(1===a)return`\n      float ${n}(int index) {\n        vec2 uv = vec2(0.5, (float(index + ${s}) + 0.5) / ${o}.0);\n        return sampleTexture(${t}, uv);\n      }\n    `;if(1===o)return`\n      float ${n}(int index) {\n        vec2 uv = vec2((float(index + ${s}) + 0.5) / ${a}.0, 0.5);\n        return sampleTexture(${t}, uv);\n      }\n    `;return`\n    float ${n}(int index) {\n      vec2 uv = uvFromFlat(${o}, ${a}, index + ${s});\n      return sampleTexture(${t}, uv);\n    }\n  `}(e);case 2:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e.shapeInfo.texShape;if(null!=o&&ce.arraysEqual(t,o)){const e=o[0],t=o[1];return`\n    float ${r}(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(${t}.0, ${e}.0);\n      return sampleTexture(${n}, uv);\n    }\n  `}const{newShape:a,keptDims:s}=ce.squeezeShape(t),i=a;if(i.length<t.length){const t=So(e,i),n=["row","col"];return`\n      ${yo(t)}\n      float ${r}(int row, int col) {\n        return ${r}(${To(n,s)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col) {\n        int index = round(dot(vec2(row, col), vec2(${t[1]}, 1)));\n        ${Ro(e)}\n      }\n    `;const u=o[0],c=o[1],l=Eo(n);if(1===c)return`\n    float ${r}(int row, int col) {\n      float index = dot(vec3(row, col, ${l}), vec3(${t[1]}, 1, 1));\n      vec2 uv = vec2(0.5, (index + 0.5) / ${u}.0);\n      return sampleTexture(${n}, uv);\n    }\n  `;if(1===u)return`\n    float ${r}(int row, int col) {\n      float index = dot(vec3(row, col, ${l}), vec3(${t[1]}, 1, 1));\n      vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);\n      return sampleTexture(${n}, uv);\n    }\n  `;return`\n  float ${r}(int row, int col) {\n    // Explicitly use integer operations as dot() only works on floats.\n    int index = row * ${t[1]} + col + ${l};\n    vec2 uv = uvFromFlat(${u}, ${c}, index);\n    return sampleTexture(${n}, uv);\n  }\n`}(e);case 3:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t[1]*t[2],a=t[2],{newShape:s,keptDims:i}=ce.squeezeShape(t),u=s;if(u.length<t.length){const t=So(e,u),n=["row","col","depth"];return`\n        ${yo(t)}\n        float ${r}(int row, int col, int depth) {\n          return ${r}(${To(n,i)});\n        }\n      `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth) {\n        int index = round(dot(vec3(row, col, depth),\n                          vec3(${o}, ${a}, 1)));\n        ${Ro(e)}\n      }\n    `;const c=e.shapeInfo.texShape,l=c[0],d=c[1],h=e.shapeInfo.flatOffset;if(d===o&&null==h)return`\n        float ${r}(int row, int col, int depth) {\n          float texR = float(row);\n          float texC = dot(vec2(col, depth), vec2(${a}, 1));\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(${d}.0, ${l}.0);\n          return sampleTexture(${n}, uv);\n        }\n      `;if(d===a&&null==h)return`\n    float ${r}(int row, int col, int depth) {\n      float texR = dot(vec2(row, col), vec2(${t[1]}, 1));\n      float texC = float(depth);\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}.0, ${l}.0);\n      return sampleTexture(${n}, uv);\n    }\n  `;const p=Eo(n);return`\n      float ${r}(int row, int col, int depth) {\n        // Explicitly use integer operations as dot() only works on floats.\n        int index = row * ${o} + col * ${a} + depth + ${p};\n        vec2 uv = uvFromFlat(${l}, ${d}, index);\n        return sampleTexture(${n}, uv);\n      }\n  `}(e);case 4:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t[3],a=t[2]*o,s=t[1]*a,{newShape:i,keptDims:u}=ce.squeezeShape(t);if(i.length<t.length){const t=So(e,i),n=["row","col","depth","depth2"];return`\n      ${yo(t)}\n      float ${r}(int row, int col, int depth, int depth2) {\n        return ${r}(${To(n,u)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth, int depth2) {\n        int index = round(dot(vec4(row, col, depth, depth2),\n                          vec4(${s}, ${a}, ${o}, 1)));\n        ${Ro(e)}\n      }\n    `;const c=e.shapeInfo.flatOffset,l=e.shapeInfo.texShape,d=l[0],h=l[1];if(h===s&&null==c)return`\n      float ${r}(int row, int col, int depth, int depth2) {\n        float texR = float(row);\n        float texC =\n            dot(vec3(col, depth, depth2),\n                vec3(${a}, ${o}, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${h}.0, ${d}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;if(h===o&&null==c)return`\n      float ${r}(int row, int col, int depth, int depth2) {\n        float texR = dot(vec3(row, col, depth),\n                         vec3(${t[1]*t[2]}, ${t[2]}, 1));\n        float texC = float(depth2);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${h}.0, ${d}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;const p=Eo(n);return`\n    float ${r}(int row, int col, int depth, int depth2) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${s} + col * ${a} +\n          depth * ${o} + depth2;\n      vec2 uv = uvFromFlat(${d}, ${h}, index + ${p});\n      return sampleTexture(${n}, uv);\n    }\n  `}(e);case 5:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t[4],a=t[3]*o,s=t[2]*a,i=t[1]*s,{newShape:u,keptDims:c}=ce.squeezeShape(t);if(u.length<t.length){const t=So(e,u),n=["row","col","depth","depth2","depth3"];return`\n      ${yo(t)}\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        return ${r}(${To(n,c)});\n      }\n    `}if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        float index = dot(\n          vec4(row, col, depth, depth2),\n          vec4(${i}, ${s}, ${a}, ${o})) +\n          depth3;\n        ${Ro(e)}\n      }\n    `;const l=e.shapeInfo.flatOffset,d=e.shapeInfo.texShape,h=d[0],p=d[1];if(p===i&&null==l)return`\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n                         vec4(${s}, ${a}, ${o}, 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${p}.0, ${h}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;if(p===o&&null==l)return`\n      float ${r}(int row, int col, int depth, int depth2, int depth3) {\n        float texR = dot(\n          vec4(row, col, depth, depth2),\n          vec4(${t[1]*t[2]*t[3]},\n               ${t[2]*t[3]}, ${t[3]}, 1));\n        int texC = depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${p}.0, ${h}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;const f=Eo(n);return`\n    float ${r}(int row, int col, int depth, int depth2, int depth3) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${i} + col * ${s} + depth * ${a} +\n          depth2 * ${o} + depth3 + ${f};\n      vec2 uv = uvFromFlat(${h}, ${p}, index);\n      return sampleTexture(${n}, uv);\n    }\n  `}(e);case 6:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),{newShape:o,keptDims:a}=ce.squeezeShape(t);if(o.length<t.length){const t=So(e,o),n=["row","col","depth","depth2","depth3","depth4"];return`\n      ${yo(t)}\n      float ${r}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        return ${r}(${To(n,a)});\n      }\n    `}const s=t[5],i=t[4]*s,u=t[3]*i,c=t[2]*u,l=t[1]*c;if(e.shapeInfo.isUniform)return`\n      float ${r}(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n        int index = round(dot(\n          vec4(row, col, depth, depth2),\n          vec4(${l}, ${c}, ${u}, ${i})) +\n          dot(\n            vec2(depth3, depth4),\n            vec2(${s}, 1)));\n        ${Ro(e)}\n      }\n    `;const d=e.shapeInfo.flatOffset,h=e.shapeInfo.texShape,p=h[0],f=h[1];if(f===l&&null==d)return`\n      float ${r}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n          vec4(${c}, ${u}, ${i}, ${s})) +\n               float(depth4);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(${f}.0, ${p}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;if(f===s&&null==d)return`\n      float ${r}(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        float texR = dot(vec4(row, col, depth, depth2),\n          vec4(${t[1]*t[2]*t[3]*t[4]},\n               ${t[2]*t[3]*t[4]},\n               ${t[3]*t[4]},\n               ${t[4]})) + float(depth3);\n        int texC = depth4;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(${f}.0, ${p}.0);\n        return sampleTexture(${n}, uv);\n      }\n    `;const g=Eo(n);return`\n    float ${r}(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * ${l} + col * ${c} + depth * ${u} +\n          depth2 * ${i} + depth3 * ${s} + depth4 + ${g};\n      vec2 uv = uvFromFlat(${p}, ${f}, index);\n      return sampleTexture(${n}, uv);\n    }\n  `}(e);default:throw new Error(t.length+"-D input sampling is not yet supported")}}function vo(e){switch(e.shapeInfo.logicalShape.length){case 0:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1),r=qr();return`\n    vec4 ${n}() {\n      return ${r.texture2D}(${t}, halfCR);\n    }\n  `}(e);case 1:return function(e){const t=e.name,n="get"+t.charAt(0).toUpperCase()+t.slice(1),r=e.shapeInfo.texShape,o=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)],a=qr();return`\n    vec4 ${n}(int index) {\n      vec2 uv = packedUVfrom1D(\n        ${o[0]}, ${o[1]}, index);\n      return ${a.texture2D}(${t}, uv);\n    }\n  `}(e);case 2:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e.shapeInfo.texShape,a=o[0],s=o[1],i=qr();if(null!=o&&ce.arraysEqual(t,o))return`\n      vec4 ${r}(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}.0, ${a}.0);\n\n        return ${i.texture2D}(${n}, uv);\n      }\n    `;const u=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)],c=Math.ceil(t[1]/2);return`\n    vec4 ${r}(int row, int col) {\n      vec2 uv = packedUVfrom2D(${c}, ${u[0]}, ${u[1]}, row, col);\n      return ${i.texture2D}(${n}, uv);\n    }\n  `}(e);case 3:return function(e){const t=e.shapeInfo.logicalShape,n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e.shapeInfo.texShape,a=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];if(1===t[0]){const n=t.slice(1),o=[1,2],a=So(e,n),s=["b","row","col"];return`\n        ${vo(a)}\n        vec4 ${r}(int b, int row, int col) {\n          return ${r}(${To(s,o)});\n        }\n      `}const s=a[0],i=a[1],u=Math.ceil(t[2]/2),c=u*Math.ceil(t[1]/2),l=qr();return`\n    vec4 ${r}(int b, int row, int col) {\n      vec2 uv = packedUVfrom3D(\n        ${s}, ${i}, ${c}, ${u}, b, row, col);\n      return ${l.texture2D}(${n}, uv);\n    }\n  `}(e);default:return function(e){const t=e.shapeInfo.logicalShape,n=t.length,r=e.name,o="get"+r.charAt(0).toUpperCase()+r.slice(1),a=e.shapeInfo.texShape,s=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)],i=s[0],u=s[1],c=Math.ceil(t[n-1]/2);let l=c*Math.ceil(t[n-2]/2),d="int b, int row, int col",h=`b * ${l} + (row / 2) * ${c} + (col / 2)`;for(let e=2;e<n-1;e++)d=`int b${e}, `+d,l*=t[n-e-1],h=`b${e} * ${l} + `+h;const p=qr();return`\n    vec4 ${o}(${d}) {\n      int index = ${h};\n      int texR = index / ${u};\n      int texC = index - texR * ${u};\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${i});\n      return ${p.texture2D}(${r}, uv);\n    }\n  `}(e)}}const wo="\nvec2 uvFromFlat(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\nvec2 packedUVfrom1D(int texNumR, int texNumC, int index) {\n  int texelIndex = index / 2;\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",Co="\nvec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,\n  int texNumC, int row, int col) {\n  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",$o="\nvec2 packedUVfrom3D(int texNumR, int texNumC,\n    int texelsInBatch, int texelsInLogicalRow, int b,\n    int row, int col) {\n  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",Io="\n  float getChannel(vec4 frag, vec2 innerDims) {\n    vec2 modCoord = mod(innerDims, 2.);\n    return modCoord.x == 0. ?\n      (modCoord.y == 0. ? frag.r : frag.g) :\n      (modCoord.y == 0. ? frag.b : frag.a);\n  }\n  float getChannel(vec4 frag, int dim) {\n    float modCoord = mod(float(dim), 2.);\n    return modCoord == 0. ? frag.r : frag.g;\n  }\n";function ko(){return"\n    int getOutputCoords() {\n      return 0;\n    }\n  "}function Eo(e){return"offset"+e}function Ro(e){const t=e.name,n=ce.sizeFromShape(e.shapeInfo.logicalShape);return n<2?`return ${t};`:`\n    for (int i = 0; i < ${n}; i++) {\n      if (i == index) {\n        return ${t}[i];\n      }\n    }\n  `}function Oo(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";if(6===e)return"ivec6";throw Error(`GPU for rank ${e} is not yet supported`)}function So(e,t){const n=JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape=t,n}function To(e,t){return t.map(t=>e[t]).join(", ")}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ao(e,t){if(e.length!==t.length)throw Error(`Binary was compiled with ${e.length} inputs, but was executed with ${t.length} inputs`);e.forEach((e,n)=>{const r=e.logicalShape,o=t[n],a=o.shape;if(!ce.arraysEqual(r,a))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${r} and ${a} must match`);if(e.isUniform&&o.isUniform)return;const s=e.texShape,i=o.isUniform?null:o.texData.texShape;if(!ce.arraysEqual(s,i))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${s} and ${i} must match`)})}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function No(e,t){Array.isArray(e)||(e=[e]),e.forEach(e=>{null!=e&&ce.assert("complex64"!==e.dtype,()=>t+" does not support complex64 tensors in the CPU backend.")})}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fo(e){const t=new Float32Array(e.length);for(let n=0;n<e.length;++n)t[n]=Math.abs(e[n]);return t}F.a;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function _o(e){return(t,n,r,o,s)=>{const i=a.assertAndGetBroadcastShape(t,n),u=i.length,c=ce.computeStrides(i),l=ce.sizeFromShape(i),d=ce.getTypedArrayFromDType(s,l),h=t.length,p=n.length,f=ce.computeStrides(t),g=ce.computeStrides(n),m=a.getBroadcastDims(t,i),b=a.getBroadcastDims(n,i);if(m.length+b.length===0)for(let t=0;t<d.length;++t)d[t]=e(r[t%r.length],o[t%o.length]);else for(let t=0;t<d.length;++t){const n=ce.indexToLoc(t,u,c),a=n.slice(-h);m.forEach(e=>a[e]=0);const s=ce.locToIndex(a,h,f),i=n.slice(-p);b.forEach(e=>i[e]=0);const l=ce.locToIndex(i,p,g);d[t]=e(r[s],o[l])}return[d,i]}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Do(e){const{inputs:t,backend:n}=e,{real:r,imag:o}=t,a=n.data.get(r.dataId).values,s=n.data.get(o.dataId).values,i=n.makeTensorInfo(r.shape,"complex64");return n.data.get(i.dataId).complexTensorInfos={real:n.makeTensorInfo(r.shape,"float32",a),imag:n.makeTensorInfo(o.shape,"float32",s)},i}F.y;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Lo(e){const{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}F.ob;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Po(e){const{inputs:t,backend:n}=e,{input:r}=t,o=n.data.get(r.dataId).complexTensorInfos.real,a=n.data.get(o.dataId).values;return n.makeTensorInfo(o.shape,o.dtype,a)}F.fc;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bo(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{dtype:a}=r;if("complex64"===a){if("complex64"===o.dtype)return Lo({inputs:{x:o},backend:n});const e=function e(t,n,r="float32"){if("complex64"===r){return Do({inputs:{real:e(t,n,"float32"),imag:e(t,n,"float32")},backend:t})}const o=ce.makeZerosTypedArray(ce.sizeFromShape(n),r);return t.makeTensorInfo(n,r,o)}(n,o.shape,o.dtype),t=Bo({inputs:{x:o},backend:n,attrs:{dtype:"float32"}}),r=Do({inputs:{real:t,imag:e},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),r}if("complex64"===o.dtype){const e=Po({inputs:{input:o},backend:n}),t=Bo({inputs:{x:e},backend:n,attrs:{dtype:a}});return n.disposeIntermediateTensorInfo(e),t}if(!ce.hasEncodingLoss(o.dtype,a)){const e=Lo({inputs:{x:o},backend:n});return{dataId:e.dataId,shape:e.shape,dtype:a}}if("int32"===a){const e=n.data.get(o.dataId).values,t=Int32Array.from(e);return n.makeTensorInfo(o.shape,"int32",t)}if("bool"===a){const e=n.data.get(o.dataId).values,t=ce.toTypedArray([0],o.dtype),[r,a]=_o((e,t)=>e!==t?1:0)(o.shape,[],e,t,"bool");return n.makeTensorInfo(a,"bool",r)}throw new Error(`Error in Cast: failed to cast ${o.dtype} to ${a}`)}F.v;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mo(e,t,n,r){return null==n?({inputs:n,backend:o})=>{const{a:a,b:s}=n,i=o;No([a,s],e);const u=i.data.get(a.dataId).values,c=i.data.get(s.dataId).values,l=r||a.dtype,[d,h]=t(a.shape,s.shape,u,c,l);return i.makeTensorInfo(h,l,d)}:({inputs:e,backend:o})=>{const{a:a,b:s}=e,i=o;if("complex64"===a.dtype||"complex64"===s.dtype){const e=Bo({inputs:{x:a},backend:i,attrs:{dtype:"complex64"}}),t=i.data.get(e.dataId),r=t.complexTensorInfos.real,o=t.complexTensorInfos.imag,u=i.data.get(r.dataId).values,c=i.data.get(o.dataId).values,l=Bo({inputs:{x:s},backend:i,attrs:{dtype:"complex64"}}),d=i.data.get(l.dataId),h=d.complexTensorInfos.real,p=d.complexTensorInfos.imag,f=i.data.get(h.dataId).values,g=i.data.get(p.dataId).values,[m,b,x]=n(a.shape,s.shape,u,c,f,g),y=i.makeTensorInfo(x,"float32",m),v=i.makeTensorInfo(x,"float32",b),w=Do({inputs:{real:y,imag:v},backend:i});return i.disposeIntermediateTensorInfo(e),i.disposeIntermediateTensorInfo(l),i.disposeIntermediateTensorInfo(y),i.disposeIntermediateTensorInfo(v),w}{const e=i.data.get(a.dataId).values,n=i.data.get(s.dataId).values,o=r||a.dtype,[u,c]=t(a.shape,s.shape,e,n,o);return i.makeTensorInfo(c,o,u)}}}function jo(e){return(t,n,r,o,s,i)=>{const u=a.assertAndGetBroadcastShape(t,n),c=ce.sizeFromShape(u),l=u.length,d=ce.computeStrides(u),h=ce.getTypedArrayFromDType("float32",c),p=ce.getTypedArrayFromDType("float32",c),f=a.getBroadcastDims(t,u),g=a.getBroadcastDims(n,u),m=a.mergeRealAndImagArrays(r,o),b=a.mergeRealAndImagArrays(s,i),x=t.length,y=ce.computeStrides(t),v=n.length,w=ce.computeStrides(n);if(f.length+g.length===0)for(let t=0;t<h.length;t++){const n=t%m.length,r=t%b.length,o=e(m[2*n],m[2*n+1],b[2*r],b[2*r+1]);h[t]=o.real,p[t]=o.imag}else for(let t=0;t<h.length;t++){const n=ce.indexToLoc(t,l,d),r=n.slice(-x);f.forEach(e=>r[e]=0);const o=ce.locToIndex(r,x,y),a=n.slice(-v);g.forEach(e=>a[e]=0);const s=ce.locToIndex(a,v,w),i=e(m[2*o],m[2*o+1],b[2*s],b[2*s+1]);h[t]=i.real,p[t]=i.imag}return[h,p,u]}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Uo=_o((e,t)=>e+t),Wo=jo((e,t,n,r)=>({real:e+n,imag:t+r}));Mo(F.d,Uo,Wo),F.d;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Vo(e,t,n,r,o){const a=ce.sizeFromShape(r),s=ce.makeZerosTypedArray(o,n);for(let n=0;n<e.length;n++){const r=e[n];if(r<0)throw new Error("Input x must be non-negative!");r>=o||(s[r]+=a>0?t[n]:1)}return s}function zo(e,t,n,r=!1){const o=e.shape[0],a=e.shape[1],s=N([o,n],t.dtype);for(let i=0;i<o;i++)for(let o=0;o<a;o++){const a=e.get(i,o);if(a<0)throw new Error("Input x must be non-negative!");a>=n||(r?s.set(1,i,a):t.size>0?s.set(s.get(i,a)+t.get(i,o),i,a):s.set(s.get(i,a)+1,i,a))}return s}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Go(e){return(t,n,r)=>{const o=ce.getTypedArrayFromDType(n,t.length);for(let n=0;n<t.length;++n)o[n]=e(t[n],r);return o}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ho(e,t,n){return({inputs:r,attrs:o,backend:a})=>{const{x:s}=r;if(No(s,e),"string"===s.dtype||"string"===n)throw new Error("unaryKernelFunc does not support string input/output");const i=a,u=i.data.get(s.dataId).values,c=n||s.dtype,l=t(u,c,o);return i.makeTensorInfo(s.shape,c,l)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xo=Go(e=>Math.ceil(e));Ho(F.w,Xo),F.w;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Ko(e,t,n,r){const o=ce.getArrayFromDType(n,ce.sizeFromShape(t));if(r&&"string"!==n){let t=0;e.forEach(e=>{const n=ce.sizeFromShape(e.shape);o.set(e.vals,t),t+=n})}else{let r=0;e.forEach(e=>{const s="string"===n?a.fromUint8ToStringArray(e.vals):e.vals;let i=0;for(let n=0;n<e.shape[0];++n){const a=n*t[1]+r;for(let t=0;t<e.shape[1];++t)o[a+t]=s[i++]}r+=e.shape[1]})}return o}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qo=Go(e=>Math.exp(e)),Yo=(Ho(F.X,qo),F.X,Go(e=>Math.expm1(e))),Qo=(Ho(F.Z,Yo),F.Z,Go(e=>Math.floor(e)));Ho(F.db,Qo),F.db;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Zo(e,t,n){const r=N(n,e.dtype);for(let n=0;n<r.size;++n){const o=r.indexToLoc(n).slice(),a=o[0],s=o[2],i=t.locToIndex([a,s]);o[2]=t.values[i];const u=e.locToIndex(o);r.values[n]=e.values[u]}return r}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jo=_o((e,t)=>e>t?1:0),ea=(Mo(F.lb,Jo,null,"bool"),F.lb,_o((e,t)=>e<t?1:0));Mo(F.wb,ea,null,"bool"),F.wb;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function ta(e,t,n){const r=(t-e)/(n-1),o=ce.makeZerosTypedArray(n,"float32");o[0]=e;for(let e=1;e<o.length;e++)o[e]=o[e-1]+r;return o}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const na=Go(e=>Math.log(e));Ho(F.zb,na),F.zb;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function ra(e,t,n,r){const o=ce.getTypedArrayFromDType(r,ce.sizeFromShape(n));for(let n=0;n<o.length;++n){const r=n*t;let a=e[r];for(let n=0;n<t;++n){const t=e[r+n];t>a&&(a=t)}o[n]=a}return o}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const oa=_o((e,t)=>Math.max(e,t)),aa=(Mo(F.Kb,oa),F.Kb,_o((e,t)=>Math.min(e,t))),sa=(Mo(F.Nb,aa),F.Nb,_o((e,t)=>e*t)),ia=jo((e,t,n,r)=>({real:e*n-t*r,imag:e*r+t*n}));Mo(F.Rb,sa,ia),F.Rb;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function ua(e,t,n){const r=ce.createScalarValue(-1,n);return sa([],t,r,e,n)}F.Sb;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ca=_o((e,t)=>e!==t?1:0);Mo(F.Wb,ca,null,"bool"),F.Wb;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function la(e,t,n,r,o){const a=t.length,s=ce.sizeFromShape(t),i=ce.computeStrides(t),u=ce.computeStrides(o),c=ce.getTypedArrayFromDType(n,ce.sizeFromShape(o));for(let t=0;t<s;++t){const n=ce.indexToLoc(t,a,i),o=new Array(n.length);for(let e=0;e<o.length;e++)o[e]=n[r[e]];c[ce.locToIndex(o,a,u)]=e[t]}return c}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */F.Uc;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function da(e,t,n,r){const[o,s]=a.computeOutAndReduceShapes(e,r),i=Object(le.b)(t,"int32"),u=ce.makeZerosTypedArray(ce.sizeFromShape(o),i),c=ce.sizeFromShape(s);for(let e=0;e<u.length;++e){const t=e*c;let r=1;for(let e=0;e<c;++e)r*=n[t+e];u[e]=r}return{outVals:u,outShape:o,outDtype:i}}F.dc;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ha(e,t,n,r){if(e===t||e<t&&n<0||t<e&&n>1)return ce.makeZerosTypedArray(0,r);const o=Math.abs(Math.ceil((t-e)/n)),a=ce.makeZerosTypedArray(o,r);t<e&&1===n&&(n=-1),a[0]=e;for(let e=1;e<a.length;e++)a[e]=a[e-1]+n;return a}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pa=Go(e=>1/Math.sqrt(e));Ho(F.sc,pa),F.sc;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function fa(e,t,n,o,s){const i=r.isSliceContinous(o,t,n),u=ce.sizeFromShape(n),c=ce.computeStrides(o);if(i){const n=r.computeFlatOffset(t,c);return"string"===s?e.slice(n,n+u):e.subarray(n,n+u)}const l=N(o,s,"string"===s?a.fromUint8ToStringArray(e):e),d=N(n,s);for(let e=0;e<d.size;++e){const n=d.indexToLoc(e),r=n.map((e,n)=>e+t[n]);d.set(l.get(...r),...n)}return"string"===s?a.fromStringArrayToUint8(d.values):d.values}F.Ac;
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ga(e,t,n,r,o,a,s){const i=t[0],u=a[0],c=new Array(u),l=new Array(i),d=t[1];if(0===u){if(0!==i)throw new Error("Received SparseTensor with denseShape[0] = 0 but\n         indices.shape[0] = "+i);return[ce.getArrayFromDType(n,0),[0,d],ce.getArrayFromDType(o,0),c,l]}let h=!0,p=0;const f=new Array(u).fill(0);for(let t=0;t<i;++t){const n=e[t*d];if(n<0)throw new Error(`indices(${t}, 0) is invalid: ${n} < 0`);if(n>=u)throw new Error(`indices(${t}, 0) is invalid: ${n} >= ${u}`);++f[n],h=h&&n>=p,p=n}let g=!0;for(let e=0;e<u;++e){const t=0===f[e];c[e]=t,g=g&&!t,f[e]=Math.max(f[e],1),e>0&&(f[e]+=f[e-1])}if(g&&h){const t=e,n=r;for(let e=0;e<i;++e)l[e]=e;return[t,[i,d],n,c,l]}{const t=f[u-1],a=ce.getArrayFromDType(n,t*d),h=ce.getArrayFromDType(o,t),p=new Array(u).fill(0);for(let t=0;t<i;++t){const n=e[t*d],o=p[n],s=(0===n?0:f[n-1])+o;p[n]++;for(let n=0;n<d;++n)a[s*d+n]=e[t*d+n];h[s]=r[t],l[t]=s}for(let e=0;e<u;++e){if(0===p[e]){const t=0===e?0:f[e-1];a[t*d+0]=e;for(let e=1;e<d;++e)a[t*d+e]=0;h[t]=s}}return[a,[i,d],h,c,l]}}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ma(e,t,n,r,o){const a=ce.sizeFromShape(r),s=t[0],i=o.length,u=[];let c=1,l=-1;for(let e=0;e<i;++e){const t=o[e];if(-1===t){if(-1!==l)throw new Error(`only one output dimension may be -1, not both ${l} and ${e}`);l=e,u.push(1)}else{if(t<0)throw new Error(`size ${e} must be non-negative, not ${t}`);c*=t,u.push(t)}}if(-1!==l){if(c<=0)throw new Error("reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero");const e=Math.trunc(a/c);if(c*e!==a)throw new Error(`Input to reshape is a SparseTensor with ${a}\n          dense values, but the requested shape requires a multiple of ${c}. inputShape=${r} outputShape= ${u}`);u[l]=e}const d=ce.sizeFromShape(u);if(d!==a)throw new Error(`Input to reshape is a tensor with ${a} dense values, but the requested shape has ${d}. inputShape=${r} outputShape=${u}`);const h=r.length,p=[];if(h>0){p[h-1]=1;for(let e=h-2;e>=0;--e)p[e]=p[e+1]*r[e+1]}const f=[];if(i>0){f[i-1]=1;for(let e=i-2;e>=0;--e)f[e]=f[e+1]*u[e+1]}const g=ce.getArrayFromDType(n,s*i);for(let t=0;t<s;++t){let n=0;for(let r=0;r<h;++r)n+=e[t*h+r]*p[r];for(let e=0;e<i;++e)g[t*i+e]=Math.trunc(n/f[e]),n%=f[e]}return[g,[s,i],u]}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ba=_o((e,t)=>{const n=e-t;return n*n});Mo(F.Kc,ba),F.Kc;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function xa(e,t,n,r){const o=N(e,t.dtype);for(let e=0;e<o.size;e++){const a=o.indexToLoc(e),s=new Array(a.length);for(let e=0;e<s.length;e++)s[e]=a[e]*n[e]+r[e];o.set(t.get(...s),...a)}return o}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ya=_o((e,t)=>e-t),va=jo((e,t,n,r)=>({real:e-n,imag:t-r}));Mo(F.Nc,ya,va),F.Nc;
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function wa(e,t){const n=new Array(e.rank);for(let r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];const r=N(n,e.dtype);for(let t=0;t<r.values.length;++t){const n=r.indexToLoc(t),o=new Array(e.rank);for(let t=0;t<o.length;t++)o[t]=n[t]%e.shape[t];const a=e.locToIndex(o);r.values[t]=e.values[a]}return r}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ca(e,t,n,r,o){const a=t[t.length-1],[s,i]=[e.length/a,a],u=ce.getTypedArrayFromDType(n,s*r),c=ce.getTypedArrayFromDType("int32",s*r);for(let t=0;t<s;t++){const n=t*i,o=e.subarray(n,n+i),a=[];for(let e=0;e<o.length;e++)a.push({value:o[e],index:e});a.sort((e,t)=>t.value-e.value);const s=t*r,l=u.subarray(s,s+r),d=c.subarray(s,s+r);for(let e=0;e<r;e++)l[e]=a[e].value,d[e]=a[e].index}const l=t.slice();return l[l.length-1]=r,[N(l,n,u),N(l,"int32",c)]}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $a(e,t,n,r){const o=ce.parseAxisParam(t,n)[0],a=[1,n[0],1];for(let e=0;e<o;e++)a[0]*=n[e];a[1]=n[o];for(let e=o+1;e<n.length;e++)a[2]*=n[e];const s={},i=new Int32Array(n[o]),u=new A.b(a,r,e),c=[],l=1===a[0]&&1===a[2];for(let t=0;t<n[o];t++){let n;if(l)n=e[t].toString();else{const e=[];for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)e.push(u.get(n,t,r));n=e.join(",")}if(void 0!==s[n])i[t]=s[n];else{const e=Object.keys(s).length;s[n]=e,i[t]=e,c.push(t)}}const d=a.slice();d[1]=Object.keys(s).length;const h=new A.b(d,r);c.forEach((e,t)=>{for(let n=0;n<a[0];n++)for(let r=0;r<a[2];r++)h.set(u.get(n,e,r),n,t,r)});const p=n.slice();return p[o]=d[1],{outputValues:h.values,outputShape:p,indices:i}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const{addImpl:Ia,bincountImpl:ka,bincountReduceImpl:Ea,ceilImpl:Ra,concatImpl:Oa,expImpl:Sa,expm1Impl:Ta,floorImpl:Aa,gatherV2Impl:Na,greaterImpl:Fa,lessImpl:_a,linSpaceImpl:Da,logImpl:La,maxImpl:Pa,maximumImpl:Ba,minimumImpl:Ma,multiplyImpl:ja,negImpl:Ua,prodImpl:Wa,rangeImpl:Va,rsqrtImpl:za,simpleAbsImpl:Ga,sliceImpl:Ha,sparseFillEmptyRowsImpl:Xa,sparseReshapeImpl:Ka,stridedSliceImpl:qa,subImpl:Ya,tileImpl:Qa,topKImpl:Za,transposeImpl:Ja,uniqueImpl:es}=i;
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ts(e,t){return["x","y","z","w","u","v"].slice(0,t).map(t=>`${e}.${t}`)}function ns(e,t){return 1===t?[e]:ts(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class rs{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e;const t=e.length;if(0===t)this.userCode="\n        void main() {\n          setOutput(vec4(getA(), 0., 0., 0.));\n        }\n      ";else{const n=ns("rc",t),r=Oo(t),o=function(e,t,n){if(1===e)return"rc > "+t[0];let r="";for(let o=e-2;o<e;o++)r+=`${n[o]} >= ${t[o]}`,o<e-1&&(r+="||");return r}(t,e,n),a=function(e,t,n,r){if(1===e)return"";const o=r.slice(-2);return`\n    int r = ${o[0]};\n    int c = ${o[1]};\n    int rp1 = r + 1;\n    int cp1 = c + 1;\n\n    bool cEdge = cp1 >= ${t};\n    bool rEdge = rp1 >= ${n};\n  `}(t,e[e.length-1],e[e.length-2],n),s=function(e,t){const n=e.length,r=function(e,t){const n=[];for(let r=0;r<=1;r++)for(let o=0;o<=1;o++){let a=`${0===r?"r":"rp1"}, ${0===o?"c":"cp1"}`;for(let n=2;n<e;n++)a=t[t.length-1-n]+","+a;n.push(a)}return n}(n,t);if(1===n)return`getA(rc),\n            rc + 1 >= ${e[0]} ? 0. : getA(rc + 1),\n            0, 0`;return`getA(${r[0]}),\n          cEdge ? 0. : getA(${r[1]}),\n          rEdge ? 0. : getA(${r[2]}),\n          rEdge || cEdge ? 0. : getA(${r[3]})`}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e,n);this.userCode=`\n        void main() {\n          ${r} rc = getOutputCoords();\n\n          if(${o}) {\n            setOutput(vec4(0));\n          } else {\n            ${a}\n\n            setOutput(vec4(${s}));\n          }\n        }\n      `}}}class os{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;let n="";for(let e=0;e<4;e++){let t="thisRC = rc;";e%2==1&&(t+="thisRC.z += 1;"),e>1&&(t+="thisRC.y += 1;"),n+=`\n        ${t}\n        ${e>0?"if(thisRC.y < rows && thisRC.z < cols){":""}\n          int flatIndex = getFlatIndex(thisRC);\n\n          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);\n          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));\n\n          result[${e}] =\n            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);\n        ${e>0?"}":""}\n      `}var r;
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */this.userCode=`\n      ${r=t,`\n    ivec3 inputCoordsFromReshapedOutCoords(int index) {\n      ${Yr(["r","c","d"],r)}\n      return ivec3(r, c, d);\n    }\n  `}\n      ${Qr(e)}\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n\n        vec4 result = vec4(0.);\n\n        ivec3 thisRC;\n        int rows = ${e[1]};\n        int cols = ${e[2]};\n\n        ${n}\n\n        setOutput(result);\n      }\n    `}}class as{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}acquireTexture(e,t,n){const r=is(t,n),o=us(e,r,n);o in this.freeTextures||(this.freeTextures[o]=[]),o in this.usedTextures||(this.usedTextures[o]=[]);const a=ss(e,r,this.gpgpu.gl,this.gpgpu.textureConfig,n);if(this.freeTextures[o].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=a,this.log();const e=this.freeTextures[o].shift();return this.usedTextures[o].push(e),e}let s;return r===xr.PACKED_2X2_FLOAT32?s=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):r===xr.PACKED_2X2_FLOAT16?s=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):r===xr.UNPACKED_FLOAT32?s=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):r===xr.UNPACKED_FLOAT16?s=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):r===xr.PACKED_4X1_UNSIGNED_BYTE&&(s=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[o].push(s),this.numUsedTextures++,this._numBytesAllocated+=a,this.log(),s}releaseTexture(e,t,n,r){if(null==this.freeTextures)return;const o=is(n,r),a=us(t,o,r);a in this.freeTextures||(this.freeTextures[a]=[]);const s=ss(t,o,this.gpgpu.gl,this.gpgpu.textureConfig,r),i=Object(c.b)().get("WEBGL_DELETE_TEXTURE_THRESHOLD");-1!==i&&this._numBytesAllocated>i?(this.gpgpu.deleteMatrixTexture(e),this._numBytesAllocated-=s):(this.freeTextures[a].push(e),this.numFreeTextures++,this._numBytesFree+=s),this.numUsedTextures--;const u=this.usedTextures[a],l=u.indexOf(e);if(l<0)throw new Error("Cannot release a texture that was never provided by this texture manager");u.splice(l,1),this.log()}log(){if(!this.logEnabled)return;const e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);const t=this._numBytesFree/this._numBytesAllocated;console.log("Bytes allocated: "+this._numBytesAllocated),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(null!=this.freeTextures){for(const e in this.freeTextures)this.freeTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e)});for(const e in this.usedTextures)this.usedTextures[e].forEach(e=>{this.gpgpu.deleteMatrixTexture(e)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}}function ss(e,t,n,r,o){const a=function(e,t){switch(e){case xr.PACKED_2X2_FLOAT32:return po(t);case xr.PACKED_2X2_FLOAT16:return fo(t);case xr.UNPACKED_FLOAT32:return co(t);case xr.UNPACKED_FLOAT16:return lo(t);case xr.PACKED_4X1_UNSIGNED_BYTE:return ho(t);default:throw new Error("Unknown physical texture type "+e)}}(t,r);let s;if(o){const[t,n]=wr(e[0],e[1]);s=t*n}else{const[t,n]=yr(e[0],e[1]);s=t*n}return s*function(e,t){const n=e;if(t===n.R32F)return 4;if(t===n.R16F)return 2;if(t===n.RGBA32F)return 16;if(t===e.RGBA)return 16;if(t===n.RGBA16F)return 8;throw new Error("Unknown internal format "+t)}(n,a)}function is(e,t){if(e===br.UPLOAD)return xr.PACKED_2X2_FLOAT32;if(e===br.RENDER||null==e)return function(e){return Object(c.b)().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?e?xr.PACKED_2X2_FLOAT32:xr.UNPACKED_FLOAT32:e?xr.PACKED_2X2_FLOAT16:xr.UNPACKED_FLOAT16}(t);if(e===br.DOWNLOAD||e===br.PIXELS)return xr.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+e)}function us(e,t,n){return`${e[0]}_${e[1]}_${t}_${n}`}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class cs{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.userCode=`\n      float unaryOperation(float x) {\n        ${t}\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    `}}const ls="return abs(x);";const ds="return x;";class hs{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.userCode=`\n      vec4 unaryOperation(vec4 x) {\n        ${t}\n      }\n\n      void main() {\n        vec4 x = getAAtOutCoords();\n        vec4 y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ps{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e;const t=e.length,n=ns("rc",t),r=Oo(t),o=function(e,t){if(1===e)return"rc";let n="";for(let r=0;r<e;r++)n+=t[r],r<e-1&&(n+=",");return n}(t,n),a=n.slice(-2),s=t<=1?"rc":`vec2(${a.join(",")})`;this.userCode=`\n      void main() {\n        ${r} rc = getOutputCoords();\n        vec4 packedInput = getA(${o});\n\n        setOutput(getChannel(packedInput, ${s}));\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fs=s.whereImpl,gs={};class ms extends hr.b{constructor(e){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!Object(c.b)().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(null==e){const e=gr(Object(c.b)().getNumber("WEBGL_VERSION"));this.binaryCache=((t=Object(c.b)().getNumber("WEBGL_VERSION"))in gs||(gs[t]={}),gs[t]),this.gpgpu=new mo(e),this.canvas=e.canvas,this.gpgpuCreatedLocally=!0}else this.gpgpu=e,this.binaryCache={},this.gpgpuCreatedLocally=!1,this.canvas=e.gl.canvas;var t;this.textureManager=new as(this.gpgpu),this.numMBBeforeWarning=null==Object(c.b)().global.screen?1024:Object(c.b)().global.screen.height*Object(c.b)().global.screen.width*window.devicePixelRatio*600/1024/1024,this.texData=new hr.a(this,Ot())}nextDataId(){return ms.nextDataId++}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}write(e,t,n){if((Object(c.b)().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||Object(c.b)().getBool("DEBUG"))&&this.checkNumericalProblems(e),"complex64"===n&&null!=e)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");const r={id:this.nextDataId()};return this.texData.set(r,{shape:t,dtype:n,values:e,usage:br.UPLOAD,refCount:1}),r}refCount(e){if(this.texData.has(e)){return this.texData.get(e).refCount}return 0}incRef(e){this.texData.get(e).refCount++}decRef(e){if(this.texData.has(e)){this.texData.get(e).refCount--}}move(e,t,n,r,o){if(Object(c.b)().getBool("DEBUG")&&this.checkNumericalProblems(t),"complex64"===r)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:n,dtype:r,values:t,usage:br.UPLOAD,refCount:o})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){const t=this.texData.get(e),{values:n,dtype:r,complexTensorInfos:o,slice:s,shape:i,isPacked:u}=t;if(null!=s){let t;t=u?new hs(i,ds):new cs(i,ds);const n=this.runWebGLProgram(t,[{dataId:e,shape:i,dtype:r}],r),o=this.readSync(n.dataId);return this.disposeIntermediateTensorInfo(n),o}if(null!=n)return this.convertAndCacheOnCPU(e);if("string"===r)return n;const c=null!=this.activeTimers;let l,d;if(c&&(l=ce.now()),"complex64"===r){const e=this.readSync(o.real.dataId),t=this.readSync(o.imag.dataId);d=a.mergeRealAndImagArrays(e,t)}else d=this.getValuesFromTexture(e);return c&&(this.downloadWaitMs+=ce.now()-l),this.convertAndCacheOnCPU(e,d)}async read(e){if(this.pendingRead.has(e)){const t=this.pendingRead.get(e);return new Promise(e=>t.push(e))}const t=this.texData.get(e),{values:n,shape:r,slice:o,dtype:s,complexTensorInfos:i,isPacked:u}=t;if(null!=o){let t;t=u?new hs(r,ds):new cs(r,ds);const n=this.runWebGLProgram(t,[{dataId:e,shape:r,dtype:s}],s),o=this.read(n.dataId);return this.disposeIntermediateTensorInfo(n),o}if(null!=n)return this.convertAndCacheOnCPU(e);if(!Object(c.b)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&2===Object(c.b)().getNumber("WEBGL_VERSION"))throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let l,d,h=null;if("complex64"!==s&&Object(c.b)().get("WEBGL_BUFFER_SUPPORTED")){l=this.decode(e);const t=this.texData.get(l.dataId);h=this.gpgpu.createBufferFromTexture(t.texture,...vr(r))}if(this.pendingRead.set(e,[]),"complex64"!==s&&await this.gpgpu.createAndWaitForFence(),"complex64"===s){const e=await Promise.all([this.read(i.real.dataId),this.read(i.imag.dataId)]),t=e[0],n=e[1];d=a.mergeRealAndImagArrays(t,n)}else if(null==h)d=this.getValuesFromTexture(e);else{const e=ce.sizeFromShape(r);d=this.gpgpu.downloadFloat32MatrixFromBuffer(h,e)}null!=l&&this.disposeIntermediateTensorInfo(l);const p=this.convertAndCacheOnCPU(e,d),f=this.pendingRead.get(e);return this.pendingRead.delete(e),f.forEach(e=>e(p)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e)&&Ot().removeDataId(e,this),this.pendingDeletes--),p}bufferSync(e){const t=this.readSync(e.dataId);let n=t;if("string"===e.dtype)try{n=t.map(e=>ce.decodeString(e))}catch(e){throw new Error("Failed to decode encoded string bytes into utf-8")}return N(e.shape,e.dtype,n)}checkNumericalProblems(e){if(null!=e)for(let t=0;t<e.length;t++){const n=e[t];if(!Ir(n)){if(Object(c.b)().getBool("WEBGL_RENDER_FLOAT32_CAPABLE"))throw Error(`The value ${n} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`);throw Error(`The value ${n} cannot be represented on this device.`)}}}getValuesFromTexture(e){const{shape:t,dtype:n,isPacked:r}=this.texData.get(e),o=ce.sizeFromShape(t);if(Object(c.b)().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){const n=this.decode(e),r=this.texData.get(n.dataId),a=this.gpgpu.downloadMatrixFromPackedTexture(r.texture,...vr(t)).subarray(0,o);return this.disposeIntermediateTensorInfo(n),a}const a=Object(c.b)().getBool("WEBGL_PACK")&&!0===r,s=a?Br(t):t,i=a?new no(s):new to(s),u=this.runWebGLProgram(i,[{shape:s,dtype:n,dataId:e}],"float32"),l=this.texData.get(u.dataId),d=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(l.texture,l.texShape[0],l.texShape[1]).subarray(0,o);return this.disposeIntermediateTensorInfo(u),d}timerAvailable(){return Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}async time(e){const t=this.activeTimers,n=[];let r=!1;null==this.programTimersStack?(this.programTimersStack=n,r=!0):this.activeTimers.push(n),this.activeTimers=n,e();const o=ce.flatten(this.activeTimers.map(e=>e.query)).filter(e=>null!=e),a=ce.flatten(this.activeTimers.map(e=>e.name)).filter(e=>null!=e);this.activeTimers=t,r&&(this.programTimersStack=null);const s={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};if(Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){const e=await Promise.all(o);s.kernelMs=ce.sum(e),s.getExtraProfileInfo=()=>e.map((e,t)=>({name:a[t],ms:e})).map(e=>`${e.name}: ${e.ms}`).join(", ")}else s.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,s}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:ce.now(),endMs:null}}endTimer(e){return Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=ce.now(),e)}async getQueryTime(e){if(Object(c.b)().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(e);const t=e;return t.endMs-t.startMs}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);const{complexTensorInfos:n}=this.texData.get(e);return null!=n&&(this.disposeData(n.real.dataId,t),this.disposeData(n.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){const{texture:t,dtype:n,texShape:r,usage:o,isPacked:a,slice:s}=this.texData.get(e),i=s&&s.origDataId||e,u=this.dataRefCount.get(i);u>1?this.dataRefCount.set(i,u-1):(this.dataRefCount.delete(i),null!=t&&(this.numBytesInGPU-=this.computeBytes(r,n),this.textureManager.releaseTexture(t,r,o,a)));const c=this.texData.get(e);c.texture=null,c.texShape=null,c.isPacked=!1,c.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=128){return Object(c.b)().getBool("WEBGL_CPU_FORWARD")&&e.every(e=>null==this.texData.get(e.dataId).texture&&ce.sizeFromShape(e.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){a.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");const t=e.dataSync();return fs(e.shape,t)}packedUnaryOp(e,t,n){const r=new hs(e.shape,t),o=this.compileAndRun(r,[e],n);return Ot().makeTensorFromDataId(o.dataId,o.shape,o.dtype)}abs(e){if(this.shouldExecuteOnCPU([e])&&"complex64"!==e.dtype){const t=Ga(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,t)}if(Object(c.b)().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,ls,e.dtype);const t=new cs(e.shape,ls),n=this.compileAndRun(t,[e]);return Ot().makeTensorFromDataId(n.dataId,n.shape,n.dtype)}makeTensorInfo(e,t,n){let r;if("string"===t&&null!=n&&n.length>0&&ce.isString(n[0])){const o=n.map(e=>ce.encodeString(e));r=this.write(o,e,t)}else r=this.write(n,e,t);return this.texData.get(r).usage=null,{dataId:r,shape:e,dtype:t}}makeOutput(e,t,n){const{dataId:r}=this.makeTensorInfo(e,t,n);return Ot().makeTensorFromDataId(r,e,t,this)}unpackTensor(e){const t=new ps(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){const t=new rs(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){const n=[Lr(e.shape),...Pr(e.shape)],r={dtype:e.dtype,shape:n,dataId:e.dataId},o=[Lr(t),...Pr(t)],a=new os(o,n),s=this.runWebGLProgram(a,[r],e.dtype,null,!0);return{dataId:s.dataId,shape:t,dtype:s.dtype}}decode(e){const t=this.texData.get(e),{isPacked:n,shape:r,dtype:o}=t,a=Br(r);let s;s=n?new eo(a):new Jr(a);return{dtype:o,shape:r,dataId:this.runWebGLProgram(s,[{shape:a,dtype:o,dataId:e}],o,null,!0).dataId}}runWebGLProgram(e,t,n,r,o=!1){const a=this.makeTensorInfo(e.outputShape,n),s=this.texData.get(a.dataId);if(e.packedOutput&&(s.isPacked=!0),e.outPackingScheme===mr.DENSE){const t=vr(e.outputShape);s.texShape=t.map(e=>2*e)}if(null!=e.outTexUsage&&(s.usage=e.outTexUsage),0===ce.sizeFromShape(a.shape))return s.values=ce.getTypedArrayFromDType(a.dtype,0),a;const i=[],u=t.map(t=>{if("complex64"===t.dtype)throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let n=this.texData.get(t.dataId);if(null==n.texture){if(!e.packedInputs&&ce.sizeFromShape(t.shape)<=Object(c.b)().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:t.shape,texData:null,isUniform:!0,uniformValues:n.values};e.packedInputs&&(n.isPacked=!0,n.shape=t.shape)}else if(!!n.isPacked!=!!e.packedInputs)t=n.isPacked?this.unpackTensor(t):this.packTensor(t),i.push(t),n=this.texData.get(t.dataId);else if(n.isPacked&&!jr(n.shape,t.shape)){const e=t,r=t.shape;t.shape=n.shape,t=this.packedReshape(t,r),i.push(t),n=this.texData.get(t.dataId),e.shape=r}return this.uploadToGPU(t.dataId),{shape:t.shape,texData:n,isUniform:!1}});this.uploadToGPU(a.dataId);const l={shape:a.shape,texData:s,isUniform:!1},d=function(e,t,n){let r="";t.concat(n).forEach(e=>{const t=null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0,n=e.isUniform?"uniform":e.texData.texShape;r+=`${e.shape}_${n}_${t}`});const o=e.userCode;let a=e.constructor.name;return a+="_"+r+"_"+o,a}(e,u,l),h=this.getAndSaveBinary(d,()=>function(e,t,n,r){const o=t.userCode,a=n.map((e,n)=>{const r={logicalShape:e.shape,texShape:e.isUniform?null:e.texData.texShape,isUniform:e.isUniform,isPacked:!e.isUniform&&e.texData.isPacked,flatOffset:null};return null!=e.texData&&null!=e.texData.slice&&e.texData.slice.flatOffset>0&&(r.flatOffset=e.texData.slice.flatOffset),{name:t.variableNames[n],shapeInfo:r}}),s=a.map(e=>e.shapeInfo),i={logicalShape:r.shape,texShape:r.texData.texShape,isUniform:!1,isPacked:r.texData.isPacked,flatOffset:null},u=xo(a,i,o,t.packedInputs),l=e.createProgram(u);let d=null;const h=e.getUniformLocation(l,"NAN",!1);1===Object(c.b)().getNumber("WEBGL_VERSION")&&(d=e.getUniformLocation(l,"INFINITY",!1));const p={};for(let n=0;n<t.variableNames.length;n++){const r=t.variableNames[n],o=!1;p[r]=e.getUniformLocation(l,r,o),p["offset"+r]=e.getUniformLocation(l,"offset"+r,o)}return{program:t,source:u,webGLProgram:l,uniformLocations:p,inShapeInfos:s,outShapeInfo:i,infLoc:d,nanLoc:h}}(this.gpgpu,e,u,l)),p=null!=this.activeTimers;let f;p&&(f=this.startTimer()),function(e,t,n,r,o){Ao(t.inShapeInfos,n),Ao([t.outShapeInfo],[r]);const a=r.texData.texture,s=r.texData.texShape;r.texData.isPacked?e.setOutputPackedMatrixTexture(a,s[0],s[1]):e.setOutputMatrixTexture(a,s[0],s[1]),e.setProgram(t.webGLProgram),1===Object(c.b)().getNumber("WEBGL_VERSION")&&null!==t.infLoc&&e.gl.uniform1f(t.infLoc,1/0),null!==t.nanLoc&&e.gl.uniform1f(t.nanLoc,NaN),n.forEach((n,r)=>{const o=t.program.variableNames[r],a=t.uniformLocations[o],s=t.uniformLocations["offset"+o];if(null!=a)if(n.isUniform)if(ce.sizeFromShape(n.shape)<2)e.gl.uniform1f(a,n.uniformValues[0]);else{let t=n.uniformValues;t instanceof Float32Array||(t=new Float32Array(t)),e.gl.uniform1fv(a,t)}else null!=n.texData.slice&&null!=s&&e.gl.uniform1i(s,n.texData.slice.flatOffset),e.setInputMatrixTexture(n.texData.texture,a,r)}),null!=o&&o(e,t.webGLProgram),e.executeProgram()}(this.gpgpu,h,u,l,r),i.forEach(e=>this.disposeIntermediateTensorInfo(e)),p&&(f=this.endTimer(f),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(f)}));const g=Object(c.b)().get("WEBGL_FLUSH_THRESHOLD");if(g>0){const e=ce.now();e-this.lastGlFlushTime>g&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=e)}if(!Object(c.b)().getBool("WEBGL_LAZILY_UNPACK")&&s.isPacked&&!1===o){const e=this.unpackTensor(a);return this.disposeIntermediateTensorInfo(a),e}return a}compileAndRun(e,t,n,r,o=!1){n=n||t[0].dtype;return this.runWebGLProgram(e,t,n,r,o)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){if(!this.disposed){if(!Object(c.b)().getBool("IS_TEST")){Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]})}this.textureManager.dispose(),null!=this.canvas&&"undefined"!=typeof HTMLCanvasElement&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0}}floatPrecision(){var e,t;return null==this.floatPrecisionValue&&(this.floatPrecisionValue=(e=()=>{if(!Object(c.b)().get("WEBGL_RENDER_FLOAT32_ENABLED")){const e=Object(c.b)().getBool("DEBUG");Object(c.b)().set("DEBUG",!1);const t=this.abs(we(1e-8)).dataSync()[0];if(Object(c.b)().set("DEBUG",e),t>0)return 32}return 16},u.a.tidy(e,t))),this.floatPrecisionValue}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}uploadToGPU(e){const t=this.texData.get(e),{shape:n,dtype:r,values:o,texture:a,usage:s,isPacked:i}=t;if(null!=a)return;const u=null!=this.activeTimers;let l;u&&(l=ce.now());let d=t.texShape;if(null==d&&(d=function(e,t=!1){let n=Object(c.b)().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t&&(n*=2,1===(e=e.map((t,n)=>n>=e.length-2?ce.nearestLargerEven(e[n]):e[n])).length&&(e=[2,e[0]])),2!==e.length){const t=ce.squeezeShape(e);e=t.newShape}let r=ce.sizeFromShape(e);if(e.length<=1&&r<=n)return[1,r];if(2===e.length&&e[0]<=n&&e[1]<=n)return e;if(3===e.length&&e[0]*e[1]<=n&&e[2]<=n)return[e[0]*e[1],e[2]];if(3===e.length&&e[0]<=n&&e[1]*e[2]<=n)return[e[0],e[1]*e[2]];if(4===e.length&&e[0]*e[1]*e[2]<=n&&e[3]<=n)return[e[0]*e[1]*e[2],e[3]];if(4===e.length&&e[0]<=n&&e[1]*e[2]*e[3]<=n)return[e[0],e[1]*e[2]*e[3]];if(t){const t=Lr(e);let n=2,o=2;return e.length&&([n,o]=Pr(e)),r=t*(n/2)*(o/2),ce.sizeToSquarishShape(r).map(e=>2*e)}return ce.sizeToSquarishShape(r)}(n,i),t.texShape=d),null!=o){const e=Br(n);let a,s=d[1],c=d[0];const h=o instanceof Uint8Array;i?([s,c]=wr(d[0],d[1]),a=new oo(e,[c,s],h)):a=new ro(e,[c,s],h);const p=this.makeTensorInfo([c,s],r);this.texData.get(p.dataId).usage=h?br.PIXELS:br.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(p.dataId),s,c,o);const f=!0,g=this.runWebGLProgram(a,[p],r,null,f),m=this.texData.get(g.dataId);t.texture=m.texture,t.texShape=m.texShape,t.isPacked=m.isPacked,t.usage=m.usage,this.disposeIntermediateTensorInfo(p),this.texData.delete(g.dataId),t.values=null,u&&(this.uploadWaitMs+=ce.now()-l)}else{const e=this.acquireTexture(d,s,r,i);t.texture=e}}convertAndCacheOnCPU(e,t){const n=this.texData.get(e),{dtype:r}=n;return this.releaseGPUData(e),null!=t&&(n.values=function(e,t){if("float32"===t||"complex64"===t)return e;if("int32"===t||"bool"===t){const n="int32"===t?new Int32Array(e.length):new Uint8Array(e.length);for(let t=0;t<n.length;++t)n[t]=Math.round(e[t]);return n}throw new Error("Unknown dtype "+t)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(t,r)),n.values}acquireTexture(e,t,n,r){if(this.numBytesInGPU+=this.computeBytes(e,n),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){const e=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${e} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,r)}computeBytes(e,t){return e[0]*e[1]*ce.bytesPerElement(t)}}ms.nextDataId=0,
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
lr.isBrowser()&&function(e,t,n=1){u.a.registerBackend(e,t,n)}("webgl",()=>new ms,2);class bs{constructor(e,t,n){this.variableNames=["A","B"],this.outputShape=a.assertAndGetBroadcastShape(t,n),this.userCode=`\n      float binaryOperation(float a, float b) {\n        ${e}\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class xs{constructor(e,t,n,r=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=a.assertAndGetBroadcastShape(t,n);const o=this.outputShape.length;let s="";if(r)if(0===o||1===ce.sizeFromShape(this.outputShape))s="\n          result.y = 0.;\n          result.z = 0.;\n          result.w = 0.;\n        ";else{if(s=`\n          ${Oo(o)} coords = getOutputCoords();\n        `,1===o)s+=`\n            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;\n            result.z = 0.;\n            result.w = 0.;\n          `;else{const e=ns("coords",o);s+=`\n            bool nextRowOutOfBounds =\n              (${e[o-2]} + 1) >= ${this.outputShape[o-2]};\n            bool nextColOutOfBounds =\n              (${e[o-1]} + 1) >= ${this.outputShape[o-1]};\n            result.y = nextColOutOfBounds ? 0. : result.y;\n            result.z = nextRowOutOfBounds ? 0. : result.z;\n            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;\n          `}}this.userCode=`\n      vec4 binaryOperation(vec4 a, vec4 b) {\n        ${e}\n      }\n\n      void main() {\n        vec4 a = getAAtOutCoords();\n        vec4 b = getBAtOutCoords();\n\n        vec4 result = binaryOperation(a, b);\n        ${s}\n\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ys(e){const{inputs:t,backend:n}=e,{x:r}=t;return n.incRef(r.dataId),{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}const vs={kernelName:F.ob,backendName:"webgl",kernelFunc:ys};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ws(e){const{inputs:t,backend:n}=e,{real:r,imag:o}=t,a=n.makeTensorInfo(r.shape,"complex64"),s=n.texData.get(a.dataId),i=ys({inputs:{x:r},backend:n}),u=ys({inputs:{x:o},backend:n});return s.complexTensorInfos={real:i,imag:u},a}const Cs={kernelName:F.y,backendName:"webgl",kernelFunc:ws},$s="return (a < 0.) ? b * a : a;",Is="\n  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));\n  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);\n";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ks={kernelName:F.vb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{alpha:a}=r,s=n.makeTensorInfo([],"float32",ce.createScalarValue(a,"float32")),i=Object(c.b)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new xs(Is,o.shape,s.shape):new bs($s,o.shape,s.shape),u=n.runWebGLProgram(i,[o,s],o.dtype);return n.disposeIntermediateTensorInfo(s),u}},Es="return (a < 0.) ? b * a : a;",Rs="\n  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));\n  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);\n";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Os={kernelName:F.cc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{x:r,alpha:o}=t,a=Object(c.b)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new xs(Rs,r.shape,o.shape):new bs(Es,r.shape,o.shape);return n.runWebGLProgram(a,[r,o],r.dtype)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ss({opSnippet:e,packedOpSnippet:t,cpuKernelImpl:n,dtype:r}){return({inputs:o,backend:a})=>{const{x:s}=o,i=a,u=r||s.dtype;if(i.shouldExecuteOnCPU([s])&&null!=n){const e=i.texData.get(s.dataId),t=n(e.values,u);return i.makeTensorInfo(s.shape,u,t)}let l;return l=Object(c.b)().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&null!=t?new hs(s.shape,t):new cs(s.shape,e),i.runWebGLProgram(l,[s],u)}}function Ts({opSnippet:e,packedOpSnippet:t,checkOutOfBounds:n=!1,supportsComplex:r=!1,cpuKernelImpl:o,dtype:a}){return({inputs:s,backend:i})=>{const{a:u,b:l}=s,d=i;if(r&&"complex64"===u.dtype){const t=d.texData.get(u.dataId),n=d.texData.get(l.dataId),[r,o]=[[t.complexTensorInfos.real,n.complexTensorInfos.real],[t.complexTensorInfos.imag,n.complexTensorInfos.imag]].map(t=>{const[n,r]=t,o={dataId:n.dataId,dtype:n.dtype,shape:u.shape},a={dataId:r.dataId,dtype:r.dtype,shape:l.shape},s=new bs(e,u.shape,l.shape);return d.runWebGLProgram(s,[o,a],Object(le.b)(n.dtype,r.dtype))}),a=ws({inputs:{real:r,imag:o},backend:d});return d.disposeIntermediateTensorInfo(r),d.disposeIntermediateTensorInfo(o),a}const h=a||Object(le.b)(u.dtype,l.dtype);if(d.shouldExecuteOnCPU([u,l])&&null!=o){const e=d.texData.get(u.dataId),t=d.texData.get(l.dataId),[n,r]=o(u.shape,l.shape,e.values,t.values,h),a=d.makeTensorInfo(r,h);return d.texData.get(a.dataId).values=n,a}let p;return p=Object(c.b)().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&null!=t?new xs(t,u.shape,l.shape,n):new bs(e,u.shape,l.shape),d.runWebGLProgram(p,[u,l],h)}}function As(e,t=!1){if("linear"===e)return"return x;";if("relu"===e)return t?"\n  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n":"if (isnan(x)) return x;\n  return (x < 0.0) ? 0.0 : x;\n";if("elu"===e)return t?"\n  vec4 result;\n\n  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);\n  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);\n  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);\n  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);\n\n  return result;\n":"return (x >= 0.0) ? x : (exp(x) - 1.0);";if("relu6"===e)return t?"\n  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n":"if (isnan(x)) return x;\n  return (x < 0.0) ? 0.0 : min(6.0, x);\n";if("prelu"===e)return t?Rs:Es;if("leakyrelu"===e)return t?Is:$s;if("sigmoid"===e)return"return 1.0 / (1.0 + exp(-1.0 * x));";throw new Error(`Activation ${e} has not been implemented for the WebGL backend.`)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ns{constructor(e,t,n,r=!1,o=!1,a=!1,s=null,i=!1,u=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=n;const c=r?e[1]:e[2],l=Math.ceil(c/2),d=r?"i * 2, rc.y":"rc.y, i * 2",h=o?"rc.z, i * 2":"i * 2, rc.z",p=r?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],f=o?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"];let g="",m="";s&&(g=i?`vec4 activation(vec4 a) {\n          vec4 b = getPreluActivationWeightsAtOutCoords();\n          ${s}\n        }`:u?`vec4 activation(vec4 a) {\n          vec4 b = getLeakyreluAlphaAtOutCoords();\n          ${s}\n        }`:`vec4 activation(vec4 x) {\n          ${s}\n        }`,m="result = activation(result);");const b=a?"result += getBiasAtOutCoords();":"";a&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),u&&this.variableNames.push("leakyreluAlpha");let x="rc.x",y="rc.x";e[0]<t[0]?x=`int(min(float(rc.x), ${e[0]-1}.))`:t[0]<e[0]&&(y=`int(min(float(rc.x), ${t[0]-1}.))`),this.userCode=`\n      ${g}\n\n      const float sharedDimension = ${l}.0;\n\n      vec4 dot2x2ARowBCol(ivec3 rc) {\n        vec4 result = vec4(0);\n        for (int i = 0; i < ${l}; i++) {\n          int batchA = ${x};\n          int batchB = ${y};\n          vec4 a = getMatrixA(batchA, ${d});\n          vec4 b = getMatrixB(batchB, ${h});\n\n          // These swizzled products need to be separately added.\n          // See: https://github.com/tensorflow/tfjs/issues/1735\n          result += (${p[0]} * ${f[0]});\n          result += (${p[1]} * ${f[1]});\n        }\n        return result;\n      }\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n        vec4 result = dot2x2ARowBCol(rc);\n\n        ${b}\n\n        ${m}\n\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fs="return areal * breal - aimag * bimag;",_s="return areal * bimag + aimag * breal;";class Ds{constructor(e,t,n){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=a.assertAndGetBroadcastShape(t,n),this.userCode=`\n      float binaryOpComplex(\n          float areal, float aimag, float breal, float bimag) {\n        ${e}\n      }\n\n      void main() {\n        float areal = getARealAtOutCoords();\n        float aimag = getAImagAtOutCoords();\n        float breal = getBRealAtOutCoords();\n        float bimag = getBImagAtOutCoords();\n        setOutput(binaryOpComplex(areal, aimag, breal, bimag));\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ls="return a * b;";function Ps(e){const{inputs:t,backend:n}=e,{a:r,b:o}=t,s=a.upcastType(r.dtype,o.dtype);if("complex64"===r.dtype){const e=n.texData.get(r.dataId),t=n.texData.get(o.dataId),a=new Ds(Fs,r.shape,o.shape),s=new Ds(_s,r.shape,o.shape),i=[{dataId:e.complexTensorInfos.real.dataId,dtype:e.complexTensorInfos.real.dtype,shape:r.shape},{dataId:e.complexTensorInfos.imag.dataId,dtype:e.complexTensorInfos.imag.dtype,shape:r.shape},{dataId:t.complexTensorInfos.real.dataId,dtype:t.complexTensorInfos.real.dtype,shape:o.shape},{dataId:t.complexTensorInfos.imag.dataId,dtype:t.complexTensorInfos.imag.dtype,shape:o.shape}],u=n.runWebGLProgram(a,i,"float32"),c=n.runWebGLProgram(s,i,"float32"),l=ws({inputs:{real:u,imag:c},backend:n});return n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(c),l}if(n.shouldExecuteOnCPU([r,o])){const e=n.texData.get(r.dataId),t=n.texData.get(o.dataId),[a,i]=ja(r.shape,o.shape,e.values,t.values,s),u=n.makeTensorInfo(i,s);return n.texData.get(u.dataId).values=a,u}let i;return i=Object(c.b)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new xs(Ls,r.shape,o.shape):new bs(Ls,r.shape,o.shape),n.runWebGLProgram(i,[r,o],s)}const Bs={kernelName:F.Rb,backendName:"webgl",kernelFunc:Ps};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Ms(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{shape:a}=r,s=n,i=ce.sizeFromShape(o.shape),u=ce.inferFromImplicitShape(a,i),c=ce.sizeFromShape(u);ce.assert(i===c,()=>`The new shape (${u}) has ${c} elements and the old shape (${o.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`);const l=s.texData.get(o.dataId);return!l.isPacked||jr(o.shape,u)||null!==l.texture&&jr(l.shape,u)?(s.incRef(o.dataId),{dataId:o.dataId,shape:u,dtype:o.dtype}):function(e,t,n){const r=[Lr(e.shape),...Pr(e.shape)],o={dtype:e.dtype,shape:r,dataId:e.dataId},a=[Lr(t),...Pr(t)],s=new os(a,r),i=n.runWebGLProgram(s,[o],e.dtype,null,!0);return{dataId:i.dataId,shape:t,dtype:i.dtype}}(o,u,s)}const js={kernelName:F.kc,backendName:"webgl",kernelFunc:Ms};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Us{constructor(e,t){this.variableNames=["x"];const{windowSize:n,batchSize:r,inSize:o,outSize:a}=e;this.outputShape=[r,a];const s=4*Math.floor(n/4),i=n%4;let u="sumValue += dot(values, ones);";if(null!=t){const e=1/t;u=`sumValue += dot(values * ${ce.isInt(e)?e.toPrecision(2):e}, ones);`}let c="";o%n>0&&(c=`\n        if (inIdx < 0 || inIdx >= ${o}) {\n          return 0.0;\n        }\n      `),this.userCode=`\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        ${c}\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * ${n};\n\n        float sumValue = 0.0;\n\n        for (int i = 0; i < ${s}; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          ${u}\n        }\n\n        int inIdx = inOffset + ${s};\n        if (${1===i}) {\n          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);\n\n          ${u}\n        } else if (${2===i}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1), 0.0, 0.0);\n\n          ${u}\n        } else if (${3===i}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2), 0.0);\n\n          ${u}\n        }\n        setOutput(sumValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ws{constructor(e,t){this.variableNames=["x"];const{windowSize:n,batchSize:r,inSize:o,outSize:a}=e;this.outputShape=[r,a];let s="0.0",i="";"prod"===t?s="1.0":"min"===t?(s="1.0 / 1e-20",i="min"):"max"===t&&(s="-1.0 / 1e-20",i="max");let u=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"sum"===t?u="sumValue":"prod"===t?u="prodValue":"all"===t?u="allValue":"any"===t&&(u="anyValue");const c=4*Math.floor(n/4),l=n%4;let d=`\n      if (${"sum"===t}) {\n        sumValue += dot(values, ones);\n      } else if (${"prod"===t}) {\n        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);\n        prodValue *= tmp[0] * tmp[1];\n      } else {\n        minMaxValue = ${i}(values, minMaxValue);\n      }\n    `,h="vec4";"all"===t?(s="1.0",d="\n        bool reducedAllValue = all(values);\n        float floatedReducedAllValue = float(reducedAllValue);\n        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);\n      ",h="bvec4"):"any"===t&&(s="0.0",d="\n        bool reducedAnyValue = any(values);\n        float floatedReducedAnyValue = float(reducedAnyValue);\n        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);\n      ",h="bvec4");let p="";o%n>0&&(p=`\n        if (inIdx < 0 || inIdx >= ${o}) {\n          return initializationValue;\n        }\n      `),this.userCode=`\n      const float initializationValue = ${s};\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        ${p}\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * ${n};\n\n        vec4 minMaxValue = vec4(${s});\n        float prodValue = 1.0;\n        float sumValue = 0.0;\n        float allValue = 1.0;\n        float anyValue = 0.0;\n\n        for (int i = 0; i < ${c}; i += 4) {\n          int inIdx = inOffset + i;\n          ${h} values = ${h}(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          ${d}\n        }\n\n        int inIdx = inOffset + ${c};\n        if (${1===l}) {\n          ${h} values = ${h}(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          ${d}\n        } else if (${2===l}) {\n          ${h} values = ${h}(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          ${d}\n        } else if (${3===l}) {\n          ${h} values = ${h}(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          ${d}\n        }\n        setOutput(${u});\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vs(e,t,n,r){const o=function(e){const t=[];for(;0===t.length||1!==t[t.length-1].outSize;){const n=t.length?t[t.length-1].outSize:e[1],r=a.computeOptimalWindowSize(n);t.push({inSize:n,windowSize:r,outSize:Math.ceil(n/r)})}return t}(e.shape);let s=e;for(let a=0;a<o.length;a++){const{inSize:i,windowSize:u,outSize:c}=o[a];let l,d;l="mean"===n?0===a?new Us({windowSize:u,inSize:i,batchSize:e.shape[0],outSize:c},i):new Us({windowSize:u,inSize:i,batchSize:e.shape[0],outSize:c}):new Ws({windowSize:u,inSize:i,batchSize:e.shape[0],outSize:c},n),d=s,s=r.runWebGLProgram(l,[s],t),d.dataId!==e.dataId&&r.disposeIntermediateTensorInfo(d)}return s}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class zs{constructor(e,t){this.variableNames=["A"];const n=new Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];this.outputShape=n,this.rank=n.length;const r=Oo(this.rank),o=function(e){const t=e.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);const n=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],r=new Array(t);for(let t=0;t<e.length;t++)r[e[t]]=n[t];return r.join()}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(t);this.userCode=`\n    void main() {\n      ${r} resRC = getOutputCoords();\n      setOutput(getA(${o}));\n    }\n    `}}class Gs{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;const n=new Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[t[r]];if(this.outputShape=n,this.rank=n.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);const r=Oo(this.rank),o=ts("rc",this.rank),a=new Array(this.rank);for(let e=0;e<t.length;e++)a[t[e]]=o[e];const s=`vec2(${a.slice(-2).join()})`,i=`++${o[this.rank-1]} < ${n[this.rank-1]}`,u=`getChannel(getA(${a.join()}), ${s})`;this.userCode=`\n    void main() {\n      ${r} rc = getOutputCoords();\n      vec4 result = vec4(0.);\n      result[0] = ${u};\n      if(${i}) {\n        result[1] = ${u};\n      }\n      --${o[this.rank-1]};\n      if(++${o[this.rank-2]} < ${n[this.rank-2]}) {\n        result[2] = ${u};\n        if(${i}) {\n          result[3] = ${u};\n        }\n      }\n      setOutput(result);\n    }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hs(e,t,n){const r=Object(c.b)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Gs(e.shape,t):new zs(e.shape,t);return n.runWebGLProgram(r,[e],e.dtype)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Xs(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s,keepDims:i}=r;return function(e,t,n,r){const o=t,s=e.shape.length,i=ce.parseAxisParam(o,e.shape);let u=i;const c=a.getAxesPermutation(u,s),l=null!=c;let d=e;l&&(d=Hs(e,c,r),u=a.getInnerMostAxes(u.length,s)),a.assertAxesAreInnerMostDims("sum",u,s);const[h,p]=a.computeOutAndReduceShapes(d.shape,u);let f=h;n&&(f=a.expandShapeToKeepDim(h,i));const g=ce.sizeFromShape(p),m=Ms({inputs:{x:d},attrs:{shape:[ce.sizeFromShape(e.shape)/g,g]},backend:r}),b=Vs(m,Object(le.a)(e.dtype),"sum",r),x=Ms({inputs:{x:b},attrs:{shape:f},backend:r});return r.disposeIntermediateTensorInfo(m),r.disposeIntermediateTensorInfo(b),l&&r.disposeIntermediateTensorInfo(d),x}(o,s,i,n)}const Ks={kernelName:F.Oc,backendName:"webgl",kernelFunc:Xs};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qs(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{perm:a}=r,s=n,i=o.shape.length,u=new Array(i);for(let e=0;e<u.length;e++)u[e]=o.shape[a[e]];let c;if(s.shouldExecuteOnCPU([o])){const e=s.texData.get(o.dataId).values,t=Ja(e,o.shape,o.dtype,a,u);c=s.makeTensorInfo(u,o.dtype);s.texData.get(c.dataId).values=t}else c=Hs(o,a,s);return c}const Ys={kernelName:F.Uc,backendName:"webgl",kernelFunc:qs};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qs({a:e,b:t,transposeA:n,transposeB:r,backend:o,bias:a=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:u=null}){const c=e.shape.length,l=t.shape.length,d=n?e.shape[c-2]:e.shape[c-1],h=r?t.shape[l-1]:t.shape[l-2],p=n?e.shape[c-1]:e.shape[c-2],f=r?t.shape[l-2]:t.shape[l-1],g=e.shape.slice(0,-2),m=t.shape.slice(0,-2),b=ce.sizeFromShape(g),x=ce.sizeFromShape(m),y=b===x||1===b||1===x;ce.assert(c>=2&&l>=2&&y,()=>`Error in matMul: the input batch dimensions must either be the same or at least one input batch dimension must be 1. Got input batch dimensions of (${g}) and (${m}).`);const v=(b>x?e.shape.slice(0,-2):t.shape.slice(0,-2)).concat([p,f]);ce.assert(d===h,()=>`Error in matMul: inner shapes (${d}) and (${h}) of Tensors with shapes ${e.shape} and ${t.shape} and transposeA=${n} and transposeB=${r} must match.`);const w=n?[b,d,p]:[b,p,d],C=r?[x,f,h]:[x,h,f],$=Ms({inputs:{x:e},backend:o,attrs:{shape:w}}),I=Ms({inputs:{x:t},backend:o,attrs:{shape:C}}),k=[$,I],E=Math.max(b,x),R=n?$.shape[1]:$.shape[2],O=null!=a,S=null!=s,T="leakyrelu"===u,A=null!=u?As(u,!0):null;let N;if((1===p||1===f)&&R>1e3&&!1===(O||S||T||null!=A)){let e=$,t=I;n&&(e=qs({inputs:{x:$},backend:o,attrs:{perm:[0,2,1]}}),k.push(e)),r&&(t=qs({inputs:{x:I},backend:o,attrs:{perm:[0,2,1]}}),k.push(t));const a=1===f;let s=e;1!==f&&(s=Ms({inputs:{x:e},backend:o,attrs:{shape:[E,R,1]}}),k.push(s));const i=1===f?2:1;let u=t;a&&(u=Ms({inputs:{x:t},backend:o,attrs:{shape:[E,1,R]}}),k.push(u));const c=Ps({inputs:{a:s,b:u},backend:o});N=Xs({inputs:{x:c},backend:o,attrs:{axis:i,keepDims:!0}}),k.push(c)}else{const u=Object(le.b)(e.dtype,t.dtype),c=new Ns(w,C,[E,p,f],n,r,O,A,S,T),l=[$,I];if(null!=a&&l.push(a),S&&l.push(s),T){const e=o.makeTensorInfo([],"float32",ce.createScalarValue(i,"float32"));l.push(e),k.push(e)}N=o.runWebGLProgram(c,l,u)}const F=Ms({inputs:{x:N},backend:o,attrs:{shape:v}});k.push(N);for(const e of k)o.disposeIntermediateTensorInfo(e);return F}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zs={kernelName:F.Zc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{a:o,b:a,bias:s,preluActivationWeights:i}=t,{transposeA:u,transposeB:c,activation:l,leakyreluAlpha:d}=r;return Qs({a:o,b:a,transposeA:u,transposeB:c,backend:n,bias:s,preluActivationWeights:i,leakyreluAlpha:d,activation:l})}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Js={kernelName:F.a,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{x:r}=t;if(n.shouldExecuteOnCPU([r])&&"complex64"!==r.dtype){const e=n.texData.get(r.dataId),t=Ga(e.values);return n.makeTensorInfo(r.shape,r.dtype,t)}let o;return o=Object(c.b)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new hs(r.shape,"return abs(x);"):new cs(r.shape,"return abs(x);"),n.runWebGLProgram(o,[r],r.dtype)}},ei=Ss({opSnippet:"if (isnan(x)) return x;\n  if (abs(x) > 1.) {\n    return NAN;\n  }\n  return acos(x);\n"}),ti={kernelName:F.b,backendName:"webgl",kernelFunc:ei},ni=Ss({opSnippet:"if (isnan(x)) return x;\n  if (x < 1.0) return NAN;\nreturn log(x + sqrt(x * x - 1.0));"}),ri={kernelName:F.c,backendName:"webgl",kernelFunc:ni},oi="return a + b;",ai=Ts({opSnippet:oi,packedOpSnippet:oi,supportsComplex:!0,cpuKernelImpl:Ia}),si={kernelName:F.d,backendName:"webgl",kernelFunc:ai};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class ii{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((e,t)=>"T"+t);const n=[];this.variableNames.forEach(e=>{n.push(`float v${e} = get${e}AtOutCoords();`)});const r=this.variableNames.map(e=>"v"+e).join(" + ");this.userCode=`\n      void main() {\n        ${n.join("\n        ")}\n\n        float result = ${r};\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ui{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((e,t)=>"T"+t);const n=[];this.variableNames.forEach(e=>{n.push(`vec4 v${e} = get${e}AtOutCoords();`)});const r=this.variableNames.map(e=>"v"+e).join(" + ");this.userCode=`\n      void main() {\n        ${n.join("\n        ")}\n\n        vec4 result = ${r};\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ci={kernelName:F.e,backendName:"webgl",kernelFunc:function e(t){const{inputs:n,backend:r}=t,o=n;if(1===o.length)return ys({inputs:{x:o[0]},backend:r});if(o.length>Object(c.b)().get("WEBGL_MAX_TEXTURES_IN_SHADER")){const t=Math.floor(o.length/2),n=e({inputs:o.slice(0,t),backend:r}),a=e({inputs:o.slice(t),backend:r});return e({inputs:[n,a],backend:r})}const a=o.map(e=>e.dtype).reduce((e,t)=>Object(le.b)(e,t)),s=o.map(e=>e.shape),i=Object(c.b)().getBool("WEBGL_PACK")?new ui(o[0].shape,s):new ii(o[0].shape,s);return r.runWebGLProgram(i,o,a)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const li={kernelName:F.f,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s,keepDims:i}=r,u=o.shape.length,c=ce.parseAxisParam(s,o.shape);let l=c;const d=a.getAxesPermutation(l,u);let h=o;null!=d&&(h=qs({inputs:{x:o},backend:n,attrs:{perm:d}}),l=a.getInnerMostAxes(l.length,u)),a.assertAxesAreInnerMostDims("all",l,u);const[p,f]=a.computeOutAndReduceShapes(h.shape,l),g=Ms({inputs:{x:h},backend:n,attrs:{shape:[-1,ce.sizeFromShape(f)]}}),m=Vs(g,g.dtype,"all",n);let b;if(i){b=Ms({inputs:{x:m},backend:n,attrs:{shape:a.expandShapeToKeepDim(p,c)}})}else b=Ms({inputs:{x:m},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(m),null!=d&&n.disposeIntermediateTensorInfo(h),b}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const di={kernelName:F.g,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s,keepDims:i}=r,u=o.shape.length,c=ce.parseAxisParam(s,o.shape);let l=c;const d=a.getAxesPermutation(l,u);let h=o;null!=d&&(h=qs({inputs:{x:o},backend:n,attrs:{perm:d}}),l=a.getInnerMostAxes(l.length,u)),a.assertAxesAreInnerMostDims("any",l,u);const[p,f]=a.computeOutAndReduceShapes(h.shape,l),g=Ms({inputs:{x:h},backend:n,attrs:{shape:[-1,ce.sizeFromShape(f)]}}),m=Vs(g,g.dtype,"any",n);let b;if(i){b=Ms({inputs:{x:m},backend:n,attrs:{shape:a.expandShapeToKeepDim(p,c)}})}else b=Ms({inputs:{x:m},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(m),null!=d&&n.disposeIntermediateTensorInfo(h),b}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class hi{constructor(e,t,n){this.variableNames=["A"];const{windowSize:r,batchSize:o,outSize:a}=e;n||this.variableNames.push("bestIndicesA"),this.outputShape=[o,a];const s="max"===t?">":"<",i=n?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * ${r};\n\n        int bestIndex = inOffset;\n        float bestValue = getA(batch, bestIndex);\n\n        for (int i = 0; i < ${r}; i++) {\n          int inIdx = ${i};\n          float candidate = getA(batch, inIdx);\n          if (candidate ${s} bestValue) {\n            bestValue = candidate;\n            bestIndex = inIdx;\n          }\n        }\n        setOutput(float(bestIndex));\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class pi{constructor(e,t,n,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,ce.assert(e.length>2,()=>`Packed arg${n.charAt(0).toUpperCase()+n.slice(1)} supports only inputs with rank above 2.`);const o=e[e.length-1],a=Math.ceil(o/t);this.outputShape=e.slice(0,-1),a>1&&this.outputShape.push(a),r||this.variableNames.push("bestIndicesA");const s=this.outputShape,i=s.length,u=Oo(i),c=ns("coords",i);let l,d;if(1===a){d=i+1;const e=Oo(d);l=`\n        ${e} sourceLocR = ${e}(${c.join()}, 0);\n        ++${c[i-1]};\n        ${e} sourceLocG = ${e}(${c.join()}, 0);\n        ++${c[i-2]};\n        ${e} sourceLocA = ${e}(${c.join()}, 0);\n        --${c[i-1]};\n        ${e} sourceLocB = ${e}(${c.join()}, 0);\n        --${c[i-2]};`}else d=i,l=`\n        ${u} sourceLocR = coords;\n        ++${c[i-1]};\n        ${u} sourceLocG = coords;\n        ++${c[i-2]};\n        ${u} sourceLocA = coords;\n        --${c[i-1]};\n        ${u} sourceLocB = coords;\n        --${c[i-2]};`;const h=["x","y","z","w","u","v"].slice(0,d),p="."+h[d-1],f=h.map(e=>"int "+e),g=ns("sourceLocR",d-1).concat("inIdx.r"),m=ns("sourceLocG",d-1).concat("inIdx.g"),b=ns("sourceLocB",d-1).concat("inIdx.b"),x=ns("sourceLocA",d-1).concat("inIdx.a"),y="max"===n?"greaterThan":"lessThan",v=r?"":`\n          inIdx = round(vec4(getBestIndicesAChannel(${g.join()}),\n                             getBestIndicesAChannel(${m.join()}),\n                             getBestIndicesAChannel(${b.join()}),\n                             getBestIndicesAChannel(${x.join()})));`,w=`vec4(\n            getAChannel(${g.join()}),\n            hasNextCol ? getAChannel(${m.join()}) : 0.,\n            hasNextRow ? getAChannel(${b.join()}) : 0.,\n            hasNextRow && hasNextCol ? getAChannel(${x.join()}) : 0.)`,C=r?"":`\n      float getBestIndicesAChannel(${f.join()}) {\n        return getChannel(getBestIndicesA(${h.join()}),\n                                          vec2(${h.slice(-2).join()}));\n      }`;this.userCode=`\n      float getAChannel(${f.join()}) {\n        return getChannel(getA(${h.join()}),\n                               vec2(${h.slice(-2).join()}));\n      }\n      ${C}\n      void main() {\n        ${u} coords = getOutputCoords();\n        bool hasNextCol = ${c[i-1]} < ${s[i-1]-1};\n        bool hasNextRow = ${c[i-2]} < ${s[i-2]-1};\n        ${l}\n        ivec4 srcIdx = ivec4(sourceLocR${p}, sourceLocG${p},\n          sourceLocB${p}, sourceLocA${p}) * ${t};\n        ivec4 inIdx = srcIdx;\n        vec4 bestIndex = vec4(inIdx);\n        vec4 bestValue = ${w};\n\n        for (int i = 0; i < ${t}; i++) {\n          inIdx = srcIdx;\n          ${v}\n          vec4 candidate = ${w};\n          bvec4 nan = isnan(candidate);\n          bvec4 replace = bvec4(\n            vec4(${y}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));\n\n          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,\n                           replace.y  ? candidate.y : bestValue.y,\n                           replace.z  ? candidate.z : bestValue.z,\n                           replace.w  ? candidate.w : bestValue.w);\n          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));\n          srcIdx++;\n        }\n        setOutput(bestIndex);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fi(e,t,n,r){const o=[n];if(a.assertAxesAreInnerMostDims("arg"+r.charAt(0).toUpperCase()+r.slice(1),o,t.shape.length),!Object(c.b)().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){const n=[],[s,i]=a.computeOutAndReduceShapes(t.shape,o),u=ce.sizeFromShape(i),c=Ms({inputs:{x:t},backend:e,attrs:{shape:[-1,u]}});n.push(c);const l=function e(t,n,r,o=null){let s=n.shape[0],i=n.shape[1];null!=o&&(s=o.shape[0],i=o.shape[1]);const u=a.computeOptimalWindowSize(i),c={windowSize:u,inSize:i,batchSize:s,outSize:Math.ceil(i/u)},l=new hi(c,r,null==o),d=[n];null!=o&&d.push(o);const h=t.runWebGLProgram(l,d,"int32");if(1===h.shape[1])return h;const p=e(t,n,r,h);return t.disposeIntermediateTensorInfo(h),p}(e,c,r);n.push(l);const d=Ms({inputs:{x:l},backend:e,attrs:{shape:s}});return n.forEach(t=>e.disposeIntermediateTensorInfo(t)),d}return function e(t,n,r,o=null){const s=null!=o?o.shape:n.shape,i=s[s.length-1],u=a.computeOptimalWindowSize(i),c=new pi(s,u,r,null==o),l=null==o?[n]:[n,o],d=t.runWebGLProgram(c,l,"int32");if(d.shape.length===n.shape.length){const o=e(t,n,r,d);return t.disposeIntermediateTensorInfo(d),o}return d}(e,t,r)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gi={kernelName:F.h,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s}=r;let i=ce.parseAxisParam(s,o.shape);const u=a.getAxesPermutation(i,o.shape.length);let c=o;const l=[];null!=u&&(c=qs({inputs:{x:o},backend:n,attrs:{perm:u}}),l.push(c),i=a.getInnerMostAxes(i.length,c.shape.length)),a.assertAxesAreInnerMostDims("argMax",[i[0]],c.shape.length);const d=fi(n,c,i[0],"max");return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),d}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mi={kernelName:F.i,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s}=r;let i=ce.parseAxisParam(s,o.shape);const u=a.getAxesPermutation(i,o.shape.length);let c=o;const l=[];null!=u&&(c=qs({inputs:{x:o},backend:n,attrs:{perm:u}}),l.push(c),i=a.getInnerMostAxes(i.length,c.shape.length)),a.assertAxesAreInnerMostDims("argMin",[i[0]],c.shape.length);const d=fi(n,c,i[0],"min");return l.forEach(e=>n.disposeIntermediateTensorInfo(e)),d}},bi=Ss({opSnippet:"if (isnan(x)) return x;\n  if (abs(x) > 1.) {\n    return NAN;\n  }\n  return asin(x);\n"}),xi={kernelName:F.j,backendName:"webgl",kernelFunc:bi},yi=Ss({opSnippet:"if (isnan(x)) return x;return log(x + sqrt(x * x + 1.0));"}),vi={kernelName:F.k,backendName:"webgl",kernelFunc:yi},wi=Ss({opSnippet:"if (isnan(x)) return x;\n  return atan(x);\n"}),Ci={kernelName:F.l,backendName:"webgl",kernelFunc:wi},$i=Ts({opSnippet:"\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return atan(a, b);\n",packedOpSnippet:"\n  vec4 result = atan(a, b);\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n"}),Ii={kernelName:F.m,backendName:"webgl",kernelFunc:$i},ki=Ss({opSnippet:"if (isnan(x)) return x;\n  if ((x < -1.0) || (x > 1.0)) return NAN;\nreturn (log(1.0 + x) - log(1.0 - x)) / 2.0;"}),Ei={kernelName:F.n,backendName:"webgl",kernelFunc:ki};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Ri{constructor(e,t,n,r=!1,o=!1){if(this.variableNames=["x"],"avg"===t&&n)throw new Error("Cannot compute positions for average pool.");const a=e.filterWidth,s=e.strideHeight,i=e.strideWidth,u=e.dilationHeight,c=e.dilationWidth,l=e.effectiveFilterHeight,d=e.effectiveFilterWidth,h=e.padInfo.top,p=e.padInfo.left;this.outputShape=e.outShape;const f="avg"===t,g=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,m=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`;let b="0.0";if(f||(b="-1.0 / 1e-20"),n){const t=">=";return void(this.userCode=`\n        const ivec2 strides = ivec2(${s}, ${i});\n        const ivec2 pads = ivec2(${h}, ${p});\n\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int batch = coords[0];\n          int d = coords[3];\n\n          ivec2 xRCCorner = coords.yz * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < ${l};\n              wR += ${u}) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int wC = 0; wC < ${d};\n                wC += ${c}) {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              float value = getX(batch, xR, xC, d);\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value ${t} currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = ${r?o?g:m:`wR * ${d} + wC`};\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      `)}let x=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(x="avgValue / count");const y=4*Math.floor(a/4),v=a%4,w=`\n      if (${f}) {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    `;this.userCode=`\n      const ivec2 strides = ivec2(${s}, ${i});\n      const ivec2 pads = ivec2(${h}, ${p});\n      const float initializationValue = ${b};\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xR, int xC, int d) {\n        if (xC < 0 || xC >= ${e.inWidth}) {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xR, xC, d);\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(${b});\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wR = 0; wR < ${l};\n            wR += ${u}) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= ${e.inHeight}) {\n            continue;\n          }\n\n          for (int wC = 0; wC < ${y}; wC += 4) {\n            int xC = xCCorner + wC * ${c};\n\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + ${c}, d),\n              getValue(batch, xR, xC + 2 * ${c}, d),\n              getValue(batch, xR, xC + 3 * ${c}, d)\n            );\n\n            ${w}\n          }\n\n          int xC = xCCorner + ${y};\n          if (${1===v}) {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n\n            ${w}\n          } else if (${2===v}) {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + ${c}, d),\n              initializationValue,\n              initializationValue\n            );\n\n            ${w}\n          } else if (${3===v}) {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + ${c}, d),\n              getValue(batch, xR, xC + 2 * ${c}, d),\n              initializationValue\n            );\n\n            ${w}\n          }\n        }\n        setOutput(${x});\n      }\n    `}}class Oi{constructor(e,t,n,r=!1,o=!1){if(this.variableNames=["x"],"avg"===t&&n)throw new Error("Cannot compute positions for average pool.");const a=e.filterWidth,s=e.strideDepth,i=e.strideHeight,u=e.strideWidth,c=e.dilationDepth,l=e.dilationHeight,d=e.dilationWidth,h=e.effectiveFilterDepth,p=e.effectiveFilterHeight,f=e.effectiveFilterWidth,g=e.padInfo.front,m=e.padInfo.top,b=e.padInfo.left;this.outputShape=e.outShape;const x="avg"===t;let y="0.0";if(x||(y="-1.0 / 1e-20"),n){const t=">=";return void(this.userCode=`\n        const ivec3 strides =\n            ivec3(${s}, ${i}, ${u});\n        const ivec3 pads = ivec3(${g}, ${m}, ${b});\n\n        void main() {\n          ivec5 coords = getOutputCoords();\n          int batch = coords.x;\n          int ch = coords.u;\n\n          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n          int xDCorner = xCorner.x;\n          int xRCorner = xCorner.y;\n          int xCCorner = xCorner.z;\n\n          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n\n          for (int wD = 0; wD < ${h};\n              wD += ${c}) {\n            int xD = xDCorner + wD;\n\n            if (xD < 0 || xD >= ${e.inDepth}) {\n              continue;\n            }\n\n            for (int wR = 0; wR < ${p};\n                wR += ${l}) {\n              int xR = xRCorner + wR;\n\n              if (xR < 0 || xR >= ${e.inHeight}) {\n                continue;\n              }\n\n              for (int wC = 0; wC < ${f};\n                  wC += ${d}) {\n                int xC = xCCorner + wC;\n\n                if (xC < 0 || xC >= ${e.inWidth}) {\n                  continue;\n                }\n\n                float value = getX(batch, xD, xR, xC, ch);\n\n                // If a min / max value has already been found, use it. If not,\n                // use the current value.\n                float currMinMaxValue = mix(\n                    value, minMaxValue, minMaxValueFound);\n                if (value ${t} currMinMaxValue) {\n                  minMaxValue = value;\n                  minMaxValueFound = 1.0;\n                  minMaxPosition = ${r?o?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${p} * ${f} +\n                      wR * ${f} + wC`};\n                }\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      `)}let v=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;"avg"===t&&(v="avgValue / count");const w=4*Math.floor(a/4),C=a%4,$=`\n      if (${x}) {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    `;this.userCode=`\n      const ivec3 strides =\n        ivec3(${s}, ${i}, ${u});\n      const ivec3 pads = ivec3(${g}, ${m}, ${b});\n      const float initializationValue = ${y};\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xD, int xR, int xC, int ch) {\n        if (xC < 0 || xC >= ${e.inWidth}) {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xD, xR, xC, ch);\n      }\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n        int xDCorner = xCorner.x;\n        int xRCorner = xCorner.y;\n        int xCCorner = xCorner.z;\n\n        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(${y});\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wD = 0; wD < ${h};\n            wD += ${c}) {\n          int xD = xDCorner + wD;\n\n          if (xD < 0 || xD >= ${e.inDepth}) {\n            continue;\n          }\n\n          for (int wR = 0; wR < ${p};\n            wR += ${l}) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int wC = 0; wC < ${w}; wC += 4) {\n              int xC = xCCorner + wC * ${d};\n\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + ${d}, ch),\n                getValue(batch, xD, xR, xC + 2 * ${d}, ch),\n                getValue(batch, xD, xR, xC + 3 * ${d}, ch)\n              );\n\n              ${$}\n            }\n\n            int xC = xCCorner + ${w};\n            if (${1===C}) {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                initializationValue,\n                initializationValue,\n                initializationValue\n              );\n\n              ${$}\n            } else if (${2===C}) {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + ${d}, ch),\n                initializationValue,\n                initializationValue\n              );\n\n              ${$}\n            } else if (${3===C}) {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + ${d}, ch),\n                getValue(batch, xD, xR, xC + 2 * ${d}, ch),\n                initializationValue\n              );\n\n              ${$}\n            }\n          }\n          setOutput(${v});\n        }\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Si={kernelName:F.o,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t;Xr(o,"avgPool");const{filterSize:s,strides:i,pad:u,dimRoundingMode:c}=r;ce.assert(a.eitherStridesOrDilationsAreOne(i,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '1'`);const l=a.computePool2DInfo(o.shape,s,i,1,u,c);if(1===l.filterWidth&&1===l.filterHeight&&ce.arraysEqual(l.inShape,l.outShape))return ys({inputs:{x:o},backend:n});const d=new Ri(l,"avg",!1);return n.runWebGLProgram(d,[o],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ti={kernelName:F.p,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{filterSize:s,strides:i,pad:u,dimRoundingMode:c,dataFormat:l}=r,d=a.computePool3DInfo(o.shape,s,i,[1,1,1],u,c,l),h=new Oi(d,"avg",!1);return n.runWebGLProgram(h,[o],"float32")}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ai{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;const t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,a=e.dilationHeight,s=e.dilationWidth,i=e.effectiveFilterHeight,u=e.effectiveFilterWidth,c=i-1-e.padInfo.top,l=u-1-e.padInfo.left,d=1/(t*n);this.userCode=`\n      const ivec2 pads = ivec2(${c}, ${l});\n      const float avgMultiplier = float(${d});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${i};\n            wR += ${a}) {\n          float dyR = float(dyRCorner + wR) / ${r}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < ${u};\n            wC+= ${s}) {\n            float dyC = float(dyCCorner + wC) / ${o}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n\n            dotProd += dyValue * avgMultiplier;\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class Ni{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;const t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,o=e.strideDepth,a=e.strideHeight,s=e.strideWidth,i=e.dilationDepth,u=e.dilationHeight,c=e.dilationWidth,l=e.effectiveFilterDepth,d=e.effectiveFilterHeight,h=e.effectiveFilterWidth,p=l-1-e.padInfo.front,f=d-1-e.padInfo.top,g=h-1-e.padInfo.left,m=1/(t*n*r);this.userCode=`\n      const ivec3 pads = ivec3(${p}, ${f}, ${g});\n      const float avgMultiplier = float(${m});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyDCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get\n        // dx(xD, xR, xC, ch).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int wD = 0; wD < ${l};\n            wD += ${i}) {\n          float dyD = float(dyDCorner + wD) / ${o}.0;\n\n          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {\n            continue;\n          }\n          int idyD = int(dyD);\n\n          for (int wR = 0; wR < ${d};\n              wR += ${u}) {\n            float dyR = float(dyRCorner + wR) / ${a}.0;\n\n            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||\n                fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            for (int wC = 0; wC < ${h};\n                wC += ${c}) {\n              float dyC = float(dyCCorner + wC) / ${s}.0;\n\n              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              float dyValue = getDy(batch, idyD, idyR, idyC, ch);\n\n              dotProd += dyValue * avgMultiplier;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fi={kernelName:F.q,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:o,input:s}=t,i=s,{filterSize:u,strides:c,pad:l,dimRoundingMode:d}=r,h=a.computePool3DInfo(i.shape,u,c,[1,1,1],l,d),p=new Ni(h);return n.runWebGLProgram(p,[o],i.dtype)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _i={kernelName:F.r,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:o,input:s}=t,i=s;Xr([o,s],"avgPoolGrad");const{filterSize:u,strides:c,pad:l}=r,d=a.computePool2DInfo(i.shape,u,c,1,l),h=new Ai(d);return n.runWebGLProgram(h,[o],i.dtype)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Di={kernelName:F.s,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{a:o,b:a}=t,{transposeA:s,transposeB:i}=r;return Qs({a:o,b:a,transposeA:s,transposeB:i,backend:n})}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Li{constructor(e,t,n,r,o,s){this.outputShape=[],this.variableNames=["x","mean","variance"],a.assertAndGetBroadcastShape(e,t),a.assertAndGetBroadcastShape(e,n);let i="0.0";null!=r&&(a.assertAndGetBroadcastShape(e,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let u="1.0";null!=o&&(a.assertAndGetBroadcastShape(e,o),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`\n      void main() {\n        float x = getXAtOutCoords();\n        float mean = getMeanAtOutCoords();\n        float variance = getVarianceAtOutCoords();\n        float offset = ${i};\n        float scale = ${u};\n        float inv = scale * inversesqrt(variance + float(${s}));\n        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Pi{constructor(e,t,n,r,o,s){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],a.assertAndGetBroadcastShape(e,t),a.assertAndGetBroadcastShape(e,n);let i="vec4(0.0)";null!=r&&(a.assertAndGetBroadcastShape(e,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let u="vec4(1.0)";null!=o&&(a.assertAndGetBroadcastShape(e,o),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`\n      void main() {\n        vec4 offset = ${i};\n        vec4 scale = ${u};\n\n        vec4 x = getXAtOutCoords();\n        vec4 mean = getMeanAtOutCoords();\n        vec4 variance = getVarianceAtOutCoords();\n\n        vec4 inv = scale * inversesqrt(variance + vec4(${s}));\n\n        setOutput((x - mean) * inv + offset);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bi={kernelName:F.gb,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:r,mean:o,variance:a,offset:s,scale:i}=e;ce.assert(o.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),ce.assert(null==s||o.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),ce.assert(null==i||o.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:u}=n;null==u&&(u=.001);const l=[r,o,a];let d=null;null!=s&&(d=s.shape,l.push(s));let h=null;null!=i&&(h=i.shape,l.push(i));const p=Object(c.b)().getBool("WEBGL_PACK_NORMALIZATION")?new Pi(r.shape,o.shape,a.shape,d,h,u):new Li(r.shape,o.shape,a.shape,d,h,u);return t.runWebGLProgram(p,l,l[0].dtype)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Mi{constructor(e){this.variableNames=["source"],this.outputShape=e,this.rank=e.length;const t=Oo(this.rank),n=`uniform int start[${this.rank}];`,r=function(e){if(1===e)return"sourceLoc";if(e<=6)return ji.slice(0,e).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${e} is not yet supported`)}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(this.rank);let o;o=`\n        ${t} sourceLoc;\n        ${t} coords = getOutputCoords();\n        ${e.map((e,t)=>`sourceLoc.${ji[t]} = start[${t}] + coords.${ji[t]};`).join("\n")}\n      `,this.userCode=`\n      ${n}\n      void main() {\n        ${o}\n        setOutput(getSource(${r}));\n      }\n    `}getCustomSetupFunc(e){if(e.length!==this.rank)throw Error(`The rank (${this.rank}) of the program must match the length of start (${e.length})`);return(t,n)=>{null==this.startLoc&&(this.startLoc=t.getUniformLocationNoThrow(n,"start"),null==this.startLoc)||t.gl.uniform1iv(this.startLoc,e)}}}const ji=["x","y","z","w","u","v"];class Ui{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length;const t=Oo(this.rank),n=ns("coords",this.rank),r=ns("sourceLoc",this.rank),o=1===this.rank?"sourceLoc":`vec2(${r.slice(-2).join()})`,a=`getChannel(getSource(${r.join()}), ${o})`,s=`\n      result.x = ${a};\n      if (++${n[this.rank-1]} < ${e[this.rank-1]}) {\n        ++${r[this.rank-1]};\n        result.y = ${a};\n        --${r[this.rank-1]};\n      }\n    `,i=1===this.rank?"":`\n      --${n[this.rank-1]};\n      if (++${n[this.rank-2]} < ${e[this.rank-2]}) {\n        ++${r[this.rank-2]};\n        result.z = ${a};\n        if (++${n[this.rank-1]} < ${e[this.rank-1]}) {\n          ++${r[this.rank-1]};\n          result.w = ${a};\n        }\n      }\n    `,u=this.rank<=4?`sourceLoc = coords +\n            ${t}(${e.map((e,t)=>`start[${t}]`).join()});`:e.map((e,t)=>`${r[t]} = ${n[t]} + start[${t}];`).join("\n");this.userCode=`\n      uniform int start[${this.rank}];\n      void main() {\n        ${t} coords = getOutputCoords();\n        ${t} sourceLoc;\n        ${u}\n        vec4 result = vec4(0.);\n        ${s}\n        ${i}\n        setOutput(result);\n      }\n    `}getCustomSetupFunc(e){if(e.length!==this.rank)throw Error(`The rank (${this.rank}) of the program must match the length of start (${e.length})`);return(t,n)=>{null==this.startLoc&&(this.startLoc=t.getUniformLocationNoThrow(n,"start"),null==this.startLoc)||t.gl.uniform1iv(this.startLoc,e)}}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wi(e){const{inputs:t,backend:n,attrs:o}=e,{x:a}=t,{begin:s,size:i}=o,[u,l]=r.parseSliceParams(a,s,i);if(r.assertParamsValid(a,u,l),0===ce.sizeFromShape(l))return n.makeTensorInfo(l,a.dtype,[]);if(n.shouldExecuteOnCPU([a])||"string"===a.dtype){const e=n.texData.get(a.dataId),t=Ha(e.values,u,l,a.shape,a.dtype);return n.makeTensorInfo(l,a.dtype,t)}const{isPacked:d}=n.texData.get(a.dataId),h=r.isSliceContinous(a.shape,u,l);if(d||!h){const e=Object(c.b)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Ui(l):new Mi(l),t=e.getCustomSetupFunc(u);return n.runWebGLProgram(e,[a],a.dtype,t)}return n.uploadToGPU(a.dataId),function(e,t,n,o){const a=o.texData.get(e.dataId),s=o.makeTensorInfo(n,e.dtype),i=o.texData.get(s.dataId);Object.assign(i,a),i.refCount=1,i.shape=n,i.dtype=e.dtype;let u=r.computeFlatOffset(t,ce.computeStrides(e.shape));a.slice&&(u+=a.slice.flatOffset),i.slice={flatOffset:u,origDataId:a.slice&&a.slice.origDataId||e.dataId};const c=o.dataRefCount.get(i.slice.origDataId)||1;return o.dataRefCount.set(i.slice.origDataId,c+1),s}(a,u,l,n)}const Vi={kernelName:F.Ac,backendName:"webgl",kernelFunc:Wi},zi={kernelName:F.t,backendName:"webgl",kernelFunc:e=>{const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{blockShape:s,crops:i}=r;ce.assert(o.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");const u=s.reduce((e,t)=>e*t),c=a.getReshaped(o.shape,s,u),l=a.getPermuted(c.length,s.length),d=a.getReshapedPermuted(o.shape,s,u),h=a.getSliceBeginCoords(i,s.length),p=a.getSliceSize(d,i,s.length),f=[],g=Ms({inputs:{x:o},backend:n,attrs:{shape:c}}),m=qs({inputs:{x:g},backend:n,attrs:{perm:l}}),b=Ms({inputs:{x:m},backend:n,attrs:{shape:d}}),x=Wi({inputs:{x:b},backend:n,attrs:{begin:h,size:p}});return f.push(g),f.push(m),f.push(b),f.forEach(e=>n.disposeIntermediateTensorInfo(e)),x}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gi={kernelName:F.u,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,weights:a}=t,{size:s}=r,i=n.readSync(o.dataId),u=n.readSync(a.dataId),c=ka(i,u,a.dtype,a.shape,s);return n.makeTensorInfo([s],a.dtype,c)}},Hi=Ts({opSnippet:"return float(a != b);",dtype:"bool"}),Xi={kernelName:F.Wb,backendName:"webgl",kernelFunc:Hi};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Ki(e){const{inputs:t,backend:n}=e,{input:r}=t;return ys({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.real},backend:n})}const qi={kernelName:F.fc,backendName:"webgl",kernelFunc:Ki};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yi={kernelName:F.v,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function e(t){const{inputs:n,backend:r,attrs:o}=t,{x:a}=n,{dtype:s}=o;if("complex64"===s){if("complex64"===a.dtype)return ys({inputs:{x:a},backend:r});const t=Se(a.shape),n=e({inputs:{x:a},backend:r,attrs:{dtype:"float32"}}),o=ws({inputs:{real:n,imag:t},backend:r});return t.dispose(),r.disposeIntermediateTensorInfo(n),o}if("complex64"===a.dtype){const t=Ki({inputs:{input:a},backend:r}),n=e({inputs:{x:t},backend:r,attrs:{dtype:s}});return r.disposeIntermediateTensorInfo(t),n}if(!ce.hasEncodingLoss(a.dtype,s)){const e=ys({inputs:{x:a},backend:r});return{dataId:e.dataId,shape:e.shape,dtype:s}}if("int32"===s)return function(e,t){const n=new cs(e.shape,"return float(int(x));"),r=t.runWebGLProgram(n,[e],"int32");return{dataId:r.dataId,shape:r.shape,dtype:r.dtype}}(a,r);if("bool"===s){const e=r.makeTensorInfo([],"bool",ce.getTypedArrayFromDType("bool",1)),t=Hi({inputs:{a:a,b:e},backend:r});return r.disposeIntermediateTensorInfo(e),t}throw new Error(`Error in Cast: failed to cast ${a.dtype} to ${s}`)}},Qi="return ceil(x);",Zi=Ss({opSnippet:Qi,packedOpSnippet:Qi,cpuKernelImpl:Ra}),Ji={kernelName:F.w,backendName:"webgl",kernelFunc:Zi};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class eu{constructor(e){this.variableNames=["A"],this.outputShape=e,this.userCode="\n      uniform float minVal;\n      uniform float maxVal;\n\n      void main() {\n        float value = getAAtOutCoords();\n        if (isnan(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, minVal, maxVal));\n      }\n    "}getCustomSetupFunc(e,t){return(n,r)=>{null==this.minLoc&&(this.minLoc=n.getUniformLocationNoThrow(r,"minVal"),this.maxLoc=n.getUniformLocationNoThrow(r,"maxVal")),n.gl.uniform1f(this.minLoc,e),n.gl.uniform1f(this.maxLoc,t)}}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class tu{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.userCode="\n      uniform float minVal;\n      uniform float maxVal;\n\n      void main() {\n        vec4 value = getAAtOutCoords();\n\n        if (any(isnan(value))) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));\n      }\n    "}getCustomSetupFunc(e,t){return(n,r)=>{null==this.minLoc&&(this.minLoc=n.getUniformLocationNoThrow(r,"minVal"),this.maxLoc=n.getUniformLocationNoThrow(r,"maxVal")),n.gl.uniform1f(this.minLoc,e),n.gl.uniform1f(this.maxLoc,t)}}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nu={kernelName:F.x,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{clipValueMin:a,clipValueMax:s}=r;let i;i=Object(c.b)().getBool("WEBGL_PACK_CLIP")?new tu(o.shape):new eu(o.shape);const u=i.getCustomSetupFunc(a,s);return n.runWebGLProgram(i,[o],o.dtype,u)}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ru{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode="\n      void main() {\n        float re = abs(getRealAtOutCoords());\n        float im = abs(getImagAtOutCoords());\n        float mx = max(re, im);\n\n        // sadly the length function in glsl is not underflow-safe\n        // (at least not on Intel GPUs). So the safe solution is\n        // to ensure underflow-safety in all cases.\n        setOutput(\n          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))\n        );\n      }\n    "}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ou(e,t){return{dataId:t.dataId,dtype:t.dtype,shape:e.shape}}const au={kernelName:F.z,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{x:r}=t,o=n.texData.get(r.dataId),a=new ru(r.shape),s=[ou(r,o.complexTensorInfos.real),ou(r,o.complexTensorInfos.imag)];return n.runWebGLProgram(a,s,s[0].dtype)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class su{constructor(e){this.outputShape=[],this.outputShape=a.computeOutShape(e,1),this.variableNames=e.map((e,t)=>"T"+t);const t=new Array(e.length-1);t[0]=e[0][1];for(let n=1;n<t.length;n++)t[n]=t[n-1]+e[n][1];const n=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let e=1;e<t.length;e++){const r=t[e-1];n.push(`else if (yC < ${t[e]}) setOutput(getT${e}(yR, yC-${r}));`)}const r=t.length,o=t[t.length-1];n.push(`else setOutput(getT${r}(yR, yC-${o}));`),this.userCode=`\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int yR = coords.x;\n        int yC = coords.y;\n\n        ${n.join("\n        ")}\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class iu{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=a.computeOutShape(e,t);const n=this.outputShape,r=n.length,o=Oo(r),s=ns("coords",r),i=["x","y","z","w","u","v"].slice(0,r);this.variableNames=e.map((e,t)=>"T"+t);const u=new Array(e.length-1);u[0]=e[0][t];for(let n=1;n<u.length;n++)u[n]=u[n-1]+e[n][t];const c=i[t],l=i.slice(-2),d=i.join();let h=`if (${c} < ${u[0]}) {\n        return getChannel(\n            getT0(${d}), vec2(${l.join()}));\n        }`;for(let e=1;e<u.length;e++){const t=u[e-1];h+=`\n        if (${c} < ${u[e]}  && ${c} >= ${u[e-1]}) {\n          return getChannel(\n            getT${e}(${uu(i,c,t)}),\n            vec2(${uu(l,c,t)}));\n        }`}const p=u.length,f=u[u.length-1];h+=`\n        return getChannel(\n          getT${p}(${uu(i,c,f)}),\n          vec2(${uu(l,c,f)}));`,this.userCode=`\n      float getValue(${i.map(e=>"int "+e)}) {\n        ${h}\n      }\n\n      void main() {\n        ${o} coords = getOutputCoords();\n        vec4 result = vec4(getValue(${s}), 0., 0., 0.);\n\n        ${s[r-1]} = ${s[r-1]} + 1;\n        if (${s[r-1]} < ${n[r-1]}) {\n          result.g = getValue(${s});\n        }\n\n        ${s[r-2]} = ${s[r-2]} + 1;\n        if (${s[r-2]} < ${n[r-2]}) {\n          result.a = getValue(${s});\n        }\n\n        ${s[r-1]} = ${s[r-1]} - 1;\n        if (${s[r-2]} < ${n[r-2]} &&\n            ${s[r-1]} < ${n[r-1]}) {\n          result.b = getValue(${s});\n        }\n        setOutput(result);\n      }\n    `}}function uu(e,t,n){const r=e.indexOf(t);return e.map((e,t)=>t===r?`${e} - ${n}`:e).join()}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cu(e){const{inputs:t,backend:n}=e,{input:r}=t;return ys({inputs:{x:n.texData.get(r.dataId).complexTensorInfos.imag},backend:n})}const lu={kernelName:F.pb,backendName:"webgl",kernelFunc:cu};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function du(e,t,n){const r=e[0].dtype;if("complex64"===r){const r=e.map(e=>Ki({inputs:{input:e},backend:n})),o=e.map(e=>cu({inputs:{input:e},backend:n})),a=du(r,t,n),s=du(o,t,n),i=ws({inputs:{real:a,imag:s},backend:n});return r.forEach(e=>n.disposeIntermediateTensorInfo(e)),o.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(s),i}let o=n.shouldExecuteOnCPU(e);if("string"===r&&(o=!0),o){const o=e.map(e=>{const r=ce.sizeFromShape(e.shape.slice(t));return Ms({inputs:{x:e},backend:n,attrs:{shape:[-1,r]}})}),s=o.map(e=>({vals:n.readSync(e.dataId),shape:e.shape})),i=a.computeOutShape(o.map(e=>e.shape),1),u=1===o[0].shape[0],c=Oa(s,i,r,u),l=a.computeOutShape(e.map(e=>e.shape),t),d=n.makeTensorInfo(l,r,c);return o.forEach(e=>n.disposeIntermediateTensorInfo(e)),d}if(e.length>Object(c.b)().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){const r=Math.floor(e.length/2),o=du(e.slice(0,r),t,n),a=du(e.slice(r),t,n),s=du([o,a],t,n);return n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(a),s}if(Object(c.b)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&e[0].shape.length>1){const o=new iu(e.map(e=>e.shape),t);return n.runWebGLProgram(o,e,r)}const{tensors2D:s,outShape:i}=function(e,t,n){const r=a.computeOutShape(e.map(e=>e.shape),t);return{tensors2D:e.map(e=>Ms({inputs:{x:e},attrs:{shape:[-1,ce.sizeFromShape(e.shape.slice(t))]},backend:n})),outShape:r}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e,t,n),u=new su(s.map(e=>e.shape)),l=n.runWebGLProgram(u,s,r);s.forEach(e=>n.disposeIntermediateTensorInfo(e));const d=Ms({inputs:{x:l},attrs:{shape:i},backend:n});return n.disposeIntermediateTensorInfo(l),d}function hu(e){const{inputs:t,backend:n,attrs:r}=e,{axis:o}=r,s=ce.parseAxisParam(o,t[0].shape)[0],i=a.computeOutShape(t.map(e=>e.shape),s);if(0===ce.sizeFromShape(i))return n.makeTensorInfo(i,t[0].dtype,[]);const u=t.filter(e=>ce.sizeFromShape(e.shape)>0);if(1===u.length)return ys({inputs:{x:u[0]},backend:n});const c=u.map(e=>e.shape);return a.assertParamsConsistent(c,s),du(u,s,n)}const pu={kernelName:F.A,backendName:"webgl",kernelFunc:hu};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class fu{constructor(e,t=!1,n=null,r=!1,o=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;const a=e.padInfo.top,s=e.padInfo.left,i=e.strideHeight,u=e.strideWidth,c=e.dilationHeight,l=e.dilationWidth,d=e.filterHeight,h=e.filterWidth,p=4*Math.floor(e.inChannels/4),f=e.inChannels%4,g="channelsLast"===e.dataFormat,m=g?1:2,b=g?2:3,x=g?3:1;let y="",v="";n&&(y=r?`float activation(float a) {\n          float b = getPreluActivationWeightsAtOutCoords();\n          ${n}\n        }`:o?`float activation(float a) {\n          float b = getLeakyreluAlphaAtOutCoords();\n          ${n}\n        }`:`\n          float activation(float x) {\n            ${n}\n          }\n        `,v="result = activation(result);");const w=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),o&&this.variableNames.push("leakyreluAlpha"),this.userCode=`\n      ${y}\n\n      const ivec2 strides = ivec2(${i}, ${u});\n      const ivec2 pads = ivec2(${a}, ${s});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d2 = coords[${x}];\n\n        ivec2 xRCCorner =\n            ivec2(coords[${m}], coords[${b}]) * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${d}; wR++) {\n          int xR = xRCorner + wR * ${c};\n\n          if (xR < 0 || xR >= ${e.inHeight}) {\n            continue;\n          }\n\n          for (int wC = 0; wC < ${h}; wC++) {\n            int xC = xCCorner + wC * ${l};\n\n            if (xC < 0 || xC >= ${e.inWidth}) {\n              continue;\n            }\n\n            for (int d1 = 0; d1 < ${p}; d1 += 4) {\n              vec4 wValues = vec4(\n                getW(wR, wC, d1, d2),\n                getW(wR, wC, d1 + 1, d2),\n                getW(wR, wC, d1 + 2, d2),\n                getW(wR, wC, d1 + 3, d2)\n              );\n\n              if (${g}) {\n                vec4 xValues = vec4(\n                  getX(batch, xR, xC, d1),\n                  getX(batch, xR, xC, d1 + 1),\n                  getX(batch, xR, xC, d1 + 2),\n                  getX(batch, xR, xC, d1 + 3)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec4 xValues = vec4(\n                  getX(batch, d1, xR, xC),\n                  getX(batch, d1 + 1, xR, xC),\n                  getX(batch, d1 + 2, xR, xC),\n                  getX(batch, d1 + 3, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n            }\n\n            if (${1===f}) {\n\n              if (${g}) {\n                dotProd +=\n                    getX(batch, xR, xC, ${p}) *\n                    getW(wR, wC, ${p}, d2);\n              } else {\n                dotProd +=\n                    getX(batch, ${p}, xR, xC) *\n                    getW(wR, wC, ${p}, d2);\n              }\n\n            } else if (${2===f}) {\n              vec2 wValues = vec2(\n                getW(wR, wC, ${p}, d2),\n                getW(wR, wC, ${p} + 1, d2)\n              );\n\n              if (${g}) {\n                vec2 xValues = vec2(\n                  getX(batch, xR, xC, ${p}),\n                  getX(batch, xR, xC, ${p} + 1)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec2 xValues = vec2(\n                  getX(batch, ${p}, xR, xC),\n                  getX(batch, ${p} + 1, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n\n            } else if (${3===f}) {\n              vec3 wValues = vec3(\n                getW(wR, wC, ${p}, d2),\n                getW(wR, wC, ${p} + 1, d2),\n                getW(wR, wC, ${p} + 2, d2)\n              );\n\n              if (${g}) {\n                vec3 xValues = vec3(\n                  getX(batch, xR, xC, ${p}),\n                  getX(batch, xR, xC, ${p} + 1),\n                  getX(batch, xR, xC, ${p} + 2)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec3 xValues = vec3(\n                  getX(batch, ${p}, xR, xC),\n                  getX(batch, ${p} + 1, xR, xC),\n                  getX(batch, ${p} + 2, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n\n            }\n          }\n        }\n\n        float result = dotProd;\n        ${w}\n        ${v}\n        setOutput(result);\n      }\n    `}}class gu{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;const t=e.padInfo.front,n=e.padInfo.top,r=e.padInfo.left,o=e.strideDepth,a=e.strideHeight,s=e.strideWidth,i=e.dilationDepth,u=e.dilationHeight,c=e.dilationWidth,l=e.filterDepth,d=e.filterHeight,h=e.filterWidth,p=4*Math.floor(e.inChannels/4),f=e.inChannels%4;this.userCode=`\n      const ivec3 strides = ivec3(${o}, ${a}, ${s});\n      const ivec3 pads = ivec3(${t}, ${n}, ${r});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int d2 = coords.u;\n\n        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n        int xFCorner = xFRCCorner.x;\n        int xRCorner = xFRCCorner.y;\n        int xCCorner = xFRCCorner.z;\n\n        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get\n        // y(yF, yR, yC, d2). ? = to be determined. : = across all\n        // values in that axis.\n        float dotProd = 0.0;\n        for (int wF = 0; wF < ${l}; wF++) {\n          int xF = xFCorner + wF * ${i};\n\n          if (xF < 0 || xF >= ${e.inDepth}) {\n            continue;\n          }\n\n          for (int wR = 0; wR < ${d}; wR++) {\n            int xR = xRCorner + wR * ${u};\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int wC = 0; wC < ${h}; wC++) {\n              int xC = xCCorner + wC * ${c};\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              for (int d1 = 0; d1 < ${p}; d1 += 4) {\n                vec4 xValues = vec4(\n                  getX(batch, xF, xR, xC, d1),\n                  getX(batch, xF, xR, xC, d1 + 1),\n                  getX(batch, xF, xR, xC, d1 + 2),\n                  getX(batch, xF, xR, xC, d1 + 3)\n                );\n                vec4 wValues = vec4(\n                  getW(wF, wR, wC, d1, d2),\n                  getW(wF, wR, wC, d1 + 1, d2),\n                  getW(wF, wR, wC, d1 + 2, d2),\n                  getW(wF, wR, wC, d1 + 3, d2)\n                );\n\n                dotProd += dot(xValues, wValues);\n              }\n\n              if (${1===f}) {\n                dotProd +=\n                  getX(batch, xF, xR, xC, ${p}) *\n                  getW(wF, wR, wC, ${p}, d2);\n              } else if (${2===f}) {\n                vec2 xValues = vec2(\n                  getX(batch, xF, xR, xC, ${p}),\n                  getX(batch, xF, xR, xC, ${p} + 1)\n                );\n                vec2 wValues = vec2(\n                  getW(wF, wR, wC, ${p}, d2),\n                  getW(wF, wR, wC, ${p} + 1, d2)\n                );\n                dotProd += dot(xValues, wValues);\n              } else if (${3===f}) {\n                vec3 xValues = vec3(\n                  getX(batch, xF, xR, xC, ${p}),\n                  getX(batch, xF, xR, xC, ${p} + 1),\n                  getX(batch, xF, xR, xC, ${p} + 2)\n                );\n                vec3 wValues = vec3(\n                  getW(wF, wR, wC, ${p}, d2),\n                  getW(wF, wR, wC, ${p} + 1, d2),\n                  getW(wF, wR, wC, ${p} + 2, d2)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class mu{constructor(e,t,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;const{filterWidth:r,inChannels:o,strideWidth:a,strideHeight:s,padInfo:i,outWidth:u,dilationWidth:c,dilationHeight:l,dataFormat:d}=n,{left:h,top:p}=i,f=o*r,g=qr(),m="channelsLast"===d,b=m?0:1,x=m?1:2;let y="";for(let n=0;n<=1;n++)for(let r=0;r<=1;r++)y+=`\n          blockIndex = rc.y + ${r};\n          pos = rc.x + ${n};\n\n          if(blockIndex < ${e[1]} && pos < ${e[0]}) {\n            offsetY = int(blockIndex / (${u})) * ${s} - ${p};\n            d0 = offsetY + ${l} * (pos / ${f});\n\n            if(d0 < ${t[b]} && d0 >= 0) {\n\n              offsetX = int(mod(float(blockIndex), ${u}.) * ${a}. - ${h}.);\n              d1 = offsetX + ${c} * (int(mod(float(pos), ${f}.) / ${o}.));\n\n              if(d1 < ${t[x]} && d1 >= 0) {\n\n                ch = int(mod(float(pos), ${o}.));\n\n                if (${m}) {\n                  innerDims = vec2(d1, ch);\n                  result[${2*n+r}] = getChannel(\n                    getA(d0, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                } else {\n                  innerDims = vec2(d0, d1);\n                  result[${2*n+r}] = getChannel(\n                    getA(ch, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                }\n              }\n            }\n          }\n        `;this.userCode=`\n      void main() {\n        ivec2 rc = getOutputCoords();\n\n        vec4 result = vec4(0);\n\n        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;\n        vec2 innerDims;\n\n        ${y}\n\n        ${g.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bu({x:e,filter:t,convInfo:n,backend:r,bias:o=null,preluActivationWeights:a=null,leakyreluAlpha:s=0,activation:i=null}){const u=e.shape,l=r.texData.get(e.dataId),d=n.inChannels,h=u[0]*u[1]*u[2],p=n.outChannels,f="channelsLast"===n.dataFormat;let g;const m=[],b=(1===h||1===p)&&d>1e3,x=u[2]%2!=0&&!!l.isPacked;if(!b&&Object(c.b)().getBool("WEBGL_LAZILY_UNPACK")&&Object(c.b)().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&x){const c=f?u[0]*u[1]*(u[2]+1):u[0]*u[2]*(u[3]+1),d={dataId:e.dataId,shape:[1,c,n.inChannels],dtype:e.dtype},h=l.shape;l.shape=l.shape.slice(),l.shape[l.shape.length-2]++,ce.assert(jr(l.shape,d.shape),()=>`packed reshape ${l.shape} to ${d.shape} isn't free`);const p=Ms({inputs:{x:t},backend:r,attrs:{shape:[1,n.inChannels,n.outChannels]}});m.push(p);const b=Qs({a:d,b:p,backend:r,transposeA:!1,transposeB:!1,bias:o,activation:i,preluActivationWeights:a,leakyreluAlpha:s}),x=r.texData.get(b.dataId);ce.assert(x.isPacked,()=>"batchMatMul result is expected to be packed"),l.shape=h,x.shape=n.outShape,g=ys({inputs:{x:b},backend:r}),g.shape=n.outShape,m.push(b)}else{const c=Ms({inputs:{x:e},backend:r,attrs:{shape:[1,f?u[0]*u[1]*u[2]:u[0]*u[2]*u[3],n.inChannels]}}),l=Ms({inputs:{x:t},backend:r,attrs:{shape:[1,n.inChannels,n.outChannels]}}),d=Qs({a:c,b:l,transposeA:!1,transposeB:!1,backend:r,bias:o,activation:i,preluActivationWeights:a,leakyreluAlpha:s});g=Ms({inputs:{x:d},backend:r,attrs:{shape:n.outShape}}),m.push(c),m.push(l),m.push(d)}for(const e of m)r.disposeIntermediateTensorInfo(e);return g}function xu({x:e,filter:t,convInfo:n,backend:r,bias:o=null,preluActivationWeights:a=null,leakyreluAlpha:s=0,activation:i=null}){const{filterWidth:u,filterHeight:c,inChannels:l,outWidth:d,outHeight:h,dataFormat:p}=n,f="channelsLast"===p,g=u*c*l,m=h*d,b=[g,m],x=[],y=Ms({inputs:{x:e},backend:r,attrs:{shape:e.shape.slice(1)}}),v=Ms({inputs:{x:t},backend:r,attrs:{shape:[1,g,ce.sizeFromShape(t.shape)/g]}});x.push(y),x.push(v);const w=new mu(b,y.shape,n),C=r.runWebGLProgram(w,[y],"float32"),$=Ms({inputs:{x:C},backend:r,attrs:{shape:[1,b[0],b[1]]}});x.push(C),x.push($);const I=null!=o,k=null!=a,E="leakyrelu"===i,R=i?As(i,!0):null,O=new Ns($.shape,v.shape,[1,m,n.outChannels],!0,!1,I,R,k,E),S=[$,v];if(o&&S.push(o),k&&S.push(a),E){const e=r.makeTensorInfo([],"float32",ce.createScalarValue(s,"float32"));S.push(e),x.push(e)}const T=r.runWebGLProgram(O,S,"float32"),A=Ms({inputs:{x:T},backend:r,attrs:{shape:f?[1,h,d,n.outChannels]:[1,n.outChannels,h,d]}});x.push(T);for(const e of x)r.disposeIntermediateTensorInfo(e);return A}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yu={kernelName:F.B,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,filter:s}=t,{strides:i,pad:u,dataFormat:l,dilations:d,dimRoundingMode:h}=r,p=a.convertConv2DDataFormat(l),f=a.computeConv2DInfo(o.shape,s.shape,i,d,u,h,!1,p);let g;if(1!==f.filterHeight||1!==f.filterWidth||1!==f.dilationHeight||1!==f.dilationWidth||1!==f.strideHeight||1!==f.strideWidth||"SAME"!==f.padInfo.type&&"VALID"!==f.padInfo.type)if(Object(c.b)().getBool("WEBGL_CONV_IM2COL")&&1===o.shape[0])g=xu({x:o,filter:s,convInfo:f,backend:n});else{const e=new fu(f);g=n.runWebGLProgram(e,[o,s],"float32")}else g=bu({x:o,filter:s,convInfo:f,backend:n});const m=Ms({inputs:{x:g},backend:n,attrs:{shape:f.outShape}});return n.disposeIntermediateTensorInfo(g),m}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class vu{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,o=e.padInfo.left,a="channelsLast"===e.dataFormat;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int b = 0; b < ${e.batchSize}; b++) {\n          for (int yR = 0; yR < ${e.outHeight}; yR++) {\n            int xR = wR + yR * ${t} - ${r};\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int yC = 0; yC < ${e.outWidth}; yC++) {\n              int xC = wC + yC * ${n} - ${o};\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              if (${a}) {\n                float dyValue = getDy(b, yR, yC, d2);\n                float xValue = getX(b, xR, xC, d1);\n                dotProd += (xValue * dyValue);\n              } else {\n                float dyValue = getDy(b, d2, yR, yC);\n                float xValue = getX(b, d1, xR, xC);\n                dotProd += (xValue * dyValue);\n              }\n\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class wu{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,a="channelsLast"===e.dataFormat,s=t-1-e.padInfo.top,i=n-1-e.padInfo.left,u=a?1:2,c=a?2:3,l=a?3:1;this.userCode=`\n      const ivec2 pads = ivec2(${s}, ${i});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[${l}];\n\n        ivec2 dyCorner = ivec2(coords[${u}], coords[${c}]) - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${t}; wR++) {\n          float dyR = float(dyRCorner + wR) / ${r}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = ${t} - 1 - wR;\n\n          for (int wC = 0; wC < ${n}; wC++) {\n            float dyC = float(dyCCorner + wC) / ${o}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = ${n} - 1 - wC;\n\n            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {\n\n              if (${a}) {\n                float xValue = getDy(batch, idyR, idyC, d2);\n                float wValue = getW(wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              } else {\n                float xValue = getDy(batch, d2, idyR, idyC);\n                float wValue = getW(wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              }\n\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class Cu{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,o=e.padInfo.front,a=e.padInfo.top,s=e.padInfo.left;this.userCode=`\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int wF = coords.x;\n        int wR = coords.y;\n        int wC = coords.z;\n        int d1 = coords.w;\n        int d2 = coords.u;\n\n        float dotProd = 0.0;\n\n        for (int b = 0; b < ${e.batchSize}; b++) {\n          for (int yF = 0; yF < ${e.outDepth}; yF++) {\n            int xF = wF + yF * ${t} - ${o};\n\n            if (xF < 0 || xF >= ${e.inDepth}) {\n              continue;\n            }\n\n            for (int yR = 0; yR < ${e.outHeight}; yR++) {\n              int xR = wR + yR * ${n} - ${a};\n\n              if (xR < 0 || xR >= ${e.inHeight}) {\n                continue;\n              }\n\n              for (int yC = 0; yC < ${e.outWidth}; yC++) {\n                int xC = wC + yC * ${r} - ${s};\n\n                if (xC < 0 || xC >= ${e.inWidth}) {\n                  continue;\n                }\n\n                float dyValue = getDy(b, yF, yR, yC, d2);\n                float xValue = getX(b, xF, xR, xC, d1);\n                dotProd += (xValue * dyValue);\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class $u{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterDepth,n=e.filterHeight,r=e.filterWidth,o=e.strideDepth,a=e.strideHeight,s=e.strideWidth,i=t-1-e.padInfo.front,u=n-1-e.padInfo.top,c=r-1-e.padInfo.left;this.userCode=`\n      const ivec3 pads = ivec3(${i}, ${u}, ${c});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int d1 = coords.u;\n\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyFCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        float dotProd = 0.0;\n        for (int wF = 0; wF < ${t}; wF++) {\n          float dyF = float(dyFCorner + wF) / ${o}.0;\n\n          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {\n            continue;\n          }\n          int idyF = int(dyF);\n\n          int wFPerm = ${t} - 1 - wF;\n\n          for (int wR = 0; wR < ${n}; wR++) {\n            float dyR = float(dyRCorner + wR) / ${a}.0;\n\n            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||\n              fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            int wRPerm = ${n} - 1 - wR;\n\n            for (int wC = 0; wC < ${r}; wC++) {\n              float dyC = float(dyCCorner + wC) / ${s}.0;\n\n              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              int wCPerm = ${r} - 1 - wC;\n\n              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {\n                float xValue = getDy(batch, idyF, idyR, idyC, d2);\n                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Iu={kernelName:F.C,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,dy:s}=t,{strides:i,pad:u,dataFormat:c,dimRoundingMode:l,filterShape:d}=r,h=a.convertConv2DDataFormat(c),p=a.computeConv2DInfo(o.shape,d,i,1,u,l,!1,h),f=new vu(p);return n.runWebGLProgram(f,[o,s],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ku={kernelName:F.D,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:o,filter:s}=t,{inputShape:i,strides:u,pad:c,dataFormat:l,dimRoundingMode:d}=r,h=a.convertConv2DDataFormat(l),p=a.computeConv2DInfo(i,s.shape,u,1,c,d,!1,h),f=new wu(p);return n.runWebGLProgram(f,[o,s],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Eu={kernelName:F.E,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,filter:s}=t,{strides:i,pad:u,dilations:c}=r,l=a.computeConv3DInfo(o.shape,s.shape,i,c,u),d=new gu(l);return n.runWebGLProgram(d,[o,s],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ru={kernelName:F.F,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,dy:s}=t,{strides:i,pad:u,filterShape:c}=r,l=a.computeConv3DInfo(o.shape,c,i,1,u),d=new Cu(l);return n.runWebGLProgram(d,[o,s],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ou={kernelName:F.G,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:o,filter:s}=t,{pad:i,strides:u,inputShape:c}=r,l=a.computeConv3DInfo(c,s.shape,u,1,i),d=new $u(l);return n.runWebGLProgram(d,[o,s],"float32")}},Su=Ss({opSnippet:"if (isnan(x)) return x;\n  return cos(x);\n"}),Tu={kernelName:F.H,backendName:"webgl",kernelFunc:Su},Au=Ss({opSnippet:"\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n"}),Nu={kernelName:F.I,backendName:"webgl",kernelFunc:Au};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Fu{constructor(e,t,n,r,o){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];const[a,s,i,u]=e,[c]=t,[l,d]=n;this.outputShape=[c,l,d,u];const h="bilinear"===r?1:0,[p,f]=[s-1+".0",i-1+".0"],[g,m,b]=l>1?[""+(s-1)/(l-1),"(y2-y1) * height_ratio",`y1*${p} + float(y)*(height_scale)`]:["0.0","0.0","0.5 * (y1+y2) * "+p],[x,y,v]=d>1?[""+(i-1)/(d-1),"(x2-x1) * width_ratio",`x1*${f} + float(x)*(width_scale)`]:["0.0","0.0","0.5 * (x1+x2) * "+f];this.userCode=`\n      const float height_ratio = float(${g});\n      const float width_ratio = float(${x});\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int y = coords[1];\n        int x = coords[2];\n        int d = coords[3];\n\n        // get box vals\n        float y1 = getBoxes(b,0);\n        float x1 = getBoxes(b,1);\n        float y2 = getBoxes(b,2);\n        float x2 = getBoxes(b,3);\n\n        // get image in batch index\n        int bInd = round(getBoxInd(b));\n        if(bInd < 0 || bInd >= ${a}) {\n          return;\n        }\n\n        float height_scale = ${m};\n        float width_scale = ${y};\n\n        float in_y = ${b};\n        if( in_y < 0.0 || in_y > ${p} ) {\n          setOutput(float(${o}));\n          return;\n        }\n        float in_x = ${v};\n        if( in_x < 0.0 || in_x > ${f} ) {\n          setOutput(float(${o}));\n          return;\n        }\n\n        vec2 sourceFracIndexCR = vec2(in_x,in_y);\n        if(${h} == 1) {\n          // Compute the four integer indices.\n          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);\n          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));\n\n          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);\n          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);\n          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);\n          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);\n\n          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);\n\n          float top = topLeft + (topRight - topLeft) * fracCR.x;\n          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;\n          float newValue = top + (bottom - top) * fracCR.y;\n          setOutput(newValue);\n        } else {\n          // Compute the coordinators of nearest neighbor point.\n          ivec2 sourceNearestCR = ivec2(floor(\n            sourceFracIndexCR + vec2(0.5,0.5)));\n          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);\n          setOutput(newValue);\n        }\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _u={kernelName:F.J,backendName:"webgl",kernelFunc:e=>{const{inputs:t,backend:n,attrs:r}=e,{image:o,boxes:a,boxInd:s}=t,{cropSize:i,method:u,extrapolationValue:c}=r,l=new Fu(o.shape,a.shape,i,u,c);return n.runWebGLProgram(l,[o,a,s],"float32")}};class Du{constructor(e,t,n){this.variableNames=["x"],this.outputShape=e;const r=e.length,o=t?"0.0":`getX(${Lu(r,"coords")})`,a=e[e.length-1];let s="",i="";t?(s=n?"end != "+(a-1):"end != 0",i=n?"end + 1":"end - 1"):(s=n?"end + pow2 < "+a:"end >= pow2",i=n?"end + pow2":"end - pow2"),this.userCode=`\n      uniform float index;\n      void main() {\n        ${Oo(r)} coords = getOutputCoords();\n        int end = ${Pu(r,"coords")};\n        float val = ${o};\n        int pow2 = int(pow(2.0, index));\n        if (${s}) {\n          int idx = ${i};\n          ${Pu(r,"coords")} = idx;\n          val += getX(${Lu(r,"coords")});\n        }\n        setOutput(val);\n      }\n    `}getCustomSetupFunc(e){return(t,n)=>{null==this.index&&(this.index=t.getUniformLocation(n,"index")),t.gl.uniform1f(this.index,e)}}}function Lu(e,t){if(1===e)return""+t;if(2===e)return`${t}.x, ${t}.y`;if(3===e)return`${t}.x, ${t}.y, ${t}.z`;if(4===e)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw Error(`Cumulative sum for rank ${e} is not yet supported`)}function Pu(e,t){if(1===e)return""+t;if(2===e)return t+".y";if(3===e)return t+".z";if(4===e)return t+".w";throw Error(`Cumulative sum for rank ${e} is not yet supported`)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bu={kernelName:F.K,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s,exclusive:i,reverse:u}=r,c=o.shape.length,l=a.getAxesPermutation([s],c);let d=o;null!=l&&(d=qs({inputs:{x:o},backend:n,attrs:{perm:l}}));const h=a.getInnerMostAxes(1,c)[0];if(h!==c-1)throw new Error(`WebGL cumsum shader expects an inner-most axis=${o.shape.length-1} but got axis=`+s);const p=d.shape[h];let f=ys({inputs:{x:d},backend:n});for(let e=0;e<=Math.ceil(Math.log2(p))-1;e++){const t=new Du(d.shape,!1,u),r=t.getCustomSetupFunc(e),o=f;f=n.runWebGLProgram(t,[f],f.dtype,r),n.disposeIntermediateTensorInfo(o)}if(i){const e=new Du(d.shape,i,u),t=f;f=n.runWebGLProgram(e,[f],f.dtype),n.disposeIntermediateTensorInfo(t)}if(null!=l){const e=qs({inputs:{x:f},backend:n,attrs:{perm:a.getUndoAxesPermutation(l)}});return n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(d),e}return f}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mu={kernelName:F.L,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,weights:a}=t,{size:s,binaryOutput:i}=r;if(1===o.shape.length){const e=n.readSync(o.dataId),t=n.readSync(a.dataId),r=ka(e,t,a.dtype,a.shape,s);return n.makeTensorInfo([s],a.dtype,r)}if(2===o.shape.length){const e=n.bufferSync(o),t=n.bufferSync(a),r=Ea(e,t,s,i);return n.makeTensorInfo(r.shape,a.dtype,r.values)}throw new Error("Error in denseBincount: input must be at most rank 2, but got rank"+o.shape.length+".")}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ju{constructor(e,t,n){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=n,this.userCode=`\n    void main() {\n      ivec4 coords = getOutputCoords();\n      int b = coords[0];\n      int h = ${this.getHeightCoordString()};\n      int w = ${this.getWidthCoordString()};\n      int d = ${this.getDepthCoordString()};\n\n      int in_h = h / ${t};\n      int offset_h = imod(h, ${t});\n      int in_w = w / ${t};\n      int offset_w = imod(w, ${t});\n      int offset_d = (offset_h * ${t} + offset_w) *\n        ${this.getOutputDepthSize()};\n      int in_d = d + offset_d;\n\n      float result = ${this.getInputSamplingString()};\n      setOutput(result);\n    }\n  `}getHeightCoordString(){return"NHWC"===this.dataFormat?"coords[1]":"coords[2]"}getWidthCoordString(){return"NHWC"===this.dataFormat?"coords[2]":"coords[3]"}getDepthCoordString(){return"NHWC"===this.dataFormat?"coords[3]":"coords[1]"}getOutputDepthSize(){return"NHWC"===this.dataFormat?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return"NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Uu={kernelName:F.M,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{blockSize:a,dataFormat:s}=r;ce.assert(a>1,()=>"blockSize should be > 1 for depthToSpace, but was: "+a);const i=o.shape[0],u="NHWC"===s?o.shape[1]:o.shape[2],c="NHWC"===s?o.shape[2]:o.shape[3],l="NHWC"===s?o.shape[3]:o.shape[1],d=u*a,h=c*a,p=l/(a*a),f=new ju("NHWC"===s?[i,d,h,p]:[i,p,d,h],a,s);return n.runWebGLProgram(f,[o],o.dtype)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Wu{constructor(e,t=!1,n=null,r=!1,o=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;const a=e.inHeight,s=e.inWidth,i=e.padInfo.top,u=e.padInfo.left,c=e.strideHeight,l=e.strideWidth,d=e.dilationHeight,h=e.dilationWidth,p=e.filterHeight,f=e.filterWidth,g=e.outChannels/e.inChannels;let m="",b="";n&&(m=r?`float activation(float a) {\n          float b = getPreluActivationWeightsAtOutCoords();\n          ${n}\n        }`:o?`float activation(float a) {\n          float b = getLeakyreluAlphaAtOutCoords();\n          ${n}\n        }`:`\n          float activation(float x) {\n            ${n}\n          }\n        `,b="result = activation(result);");const x=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),o&&this.variableNames.push("leakyreluAlpha"),this.userCode=`\n      ${m}\n\n      const ivec2 strides = ivec2(${c}, ${l});\n      const ivec2 pads = ivec2(${i}, ${u});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / ${g};\n        int q = d2 - d1 * ${g};\n\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.\n        for (int wR = 0; wR < ${p}; wR++) {\n          int xR = xRCorner + wR * ${d};\n\n          if (xR < 0 || xR >= ${a}) {\n            continue;\n          }\n\n          for (int wC = 0; wC < ${f}; wC++) {\n            int xC = xCCorner + wC * ${h};\n\n            if (xC < 0 || xC >= ${s}) {\n              continue;\n            }\n\n            float xVal = getX(batch, xR, xC, d1);\n            float wVal = getW(wR, wC, d1, q);\n            dotProd += xVal * wVal;\n          }\n        }\n\n        float result = dotProd;\n        ${x}\n        ${b}\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Vu{constructor(e,t=!1,n=null,r=!1,o=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.outShape;const a=e.outChannels/e.inChannels,s=e.inHeight,i=e.inWidth,u=e.padInfo.top,c=e.padInfo.left,l=e.strideHeight,d=e.strideWidth,h=e.dilationHeight,p=e.dilationWidth,f=e.filterHeight,g=e.filterWidth,m=g;let b="\n      int xR; int xC; int xCOffset;\n      vec4 wTexel; vec4 previous; vec4 final;";for(let e=0;e<g;e++)b+=`\n          vec4 xTexelC${2*e};\n          int xTexelC${2*e}Ready;\n          vec4 xC${e};`;for(let e=0;e<f;e++){for(let e=0;e<g;e++)b+=`\n          xTexelC${2*e} = vec4(0.0);\n          xTexelC${2*e}Ready = 0;\n          xC${e} = vec4(0.0);`;b+=`\n        xR = xRCorner + ${e*h};\n        if (xR >=0 && xR < ${s}) {\n      `;for(let t=0;t<(m+1)/2;t++){const n=2*t,r=n*p;if(b+=`\n          xC = xCCorner + ${r};\n          `,1===d){if(n<g&&(c%2==1?(b+=`\n                xCOffset = xC + 1;\n                if (xCOffset >= 0 && xCOffset < ${i} && xTexelC${r}Ready == 0) {\n                  xTexelC${r} = getX(batch, xR, xCOffset, d1);\n\n                  // Need to manually clear unused channels in case\n                  // we're reading from recycled texture.\n                  if (xCOffset + 1 >= ${i}) {\n                    xTexelC${r}.zw = vec2(0.0);\n                  }\n                  xTexelC${r}Ready = 1;\n                }\n              `,b+=1===p&&r>0?`\n                xC${n} = vec4(xTexelC${r-2}.zw, xTexelC${r}.xy);\n                `:`\n                  xCOffset = xC + 1 - 2;\n\n                  if (xCOffset >= 0 && xCOffset < ${i}) {\n                    previous = getX(batch, xR, xCOffset, d1);\n\n                    // Need to manually clear unused channels in case\n                    // we're reading from recycled texture.\n                    if (xCOffset + 1 >= ${i}) {\n                      previous.zw = vec2(0.0);\n                    }\n\n                    xC${n} = vec4(previous.zw, xTexelC${r}.xy);\n                  } else {\n                    xC${n} = vec4(0.0, 0.0, xTexelC${r}.xy);\n                  }\n                  `):b+=`\n                if (xC >= 0 && xC < ${i} && xTexelC${r}Ready == 0) {\n                  xTexelC${r} = getX(batch, xR, xC, d1);\n                  if (xC + 1 >= ${i}) {\n                    xTexelC${r}.zw = vec2(0.0);\n                  }\n                  xTexelC${r}Ready = 1;\n                }\n\n                xC${n} = xTexelC${r};\n                `,r+1<g)){const e=c%2==0?ce.nearestLargerEven(p):p;p%2==0&&c%2==1||p%2!=0&&c%2!=1?(b+=`\n                  xCOffset = xC + ${c%2} + ${e};\n\n                  if (xCOffset >= 0 && xCOffset < ${i} && xTexelC${r+2}Ready == 0) {\n                    xTexelC${r+2} = getX(batch, xR, xCOffset, d1);\n\n                    // Need to manually clear unused channels in case\n                    // we're reading from recycled texture.\n                    if (xCOffset + 1 >= ${i}) {\n                      xTexelC${r+2}.zw = vec2(0.0);\n                    }\n                    xTexelC${r+2}Ready = 1;\n                  }\n                  `,p>1&&(b+=`\n                    xCOffset -= 2;\n                    if (xCOffset >= 0 && xCOffset < ${i} && xTexelC${r}Ready == 0) {\n                      xTexelC${r} = getX(batch, xR, xCOffset, d1);\n                      xTexelC${r}Ready = 1;\n                    }\n                    `),b+=`\n                  xC${n+1} = vec4(xTexelC${r}.zw, xTexelC${r+2}.xy);\n                  `):b+=1===e?`\n                    xC${n+1} = xTexelC${r};\n                    `:`\n                    xCOffset = xC + ${e};\n\n                    if (xCOffset >= 0 && xCOffset < ${i} && xTexelC${r+2}Ready == 0) {\n                      xTexelC${r+2} = getX(batch, xR, xCOffset, d1);\n                      if (xCOffset + 1 >= ${i}) {\n                        xTexelC${r+2}.zw = vec2(0.0);\n                      }\n                      xTexelC${r+2}Ready = 1;\n                    }\n\n                    xC${n+1} = xTexelC${r+2};\n                    `}}else r<g&&(c%2==1?(b+=`\n                xCOffset = xC + 1 - ${d};\n                if(xCOffset >= 0 && xCOffset < ${i} && xTexelC${r}Ready == 0) {\n                  xTexelC${r} = getX(batch, xR, xCOffset, d1);\n                  // Need to manually clear unused channels in case\n                  // we're reading from recycled texture.\n                  if (xCOffset + 1 >= ${i}) {\n                    xTexelC${r}.zw = vec2(0.0);\n                  }\n                  xTexelC${r}Ready = 1;\n                }\n\n                if(xC + 1 >= 0 && xC + 1 < ${i} && xTexelC${r+2}Ready == 0) {\n                  xTexelC${r+2} = getX(batch, xR, xC + 1, d1);\n                  // Need to manually clear unused channels in case\n                  // we're reading from recycled texture.\n                  if (xC + 2 >= ${i}) {\n                    xTexelC${r+2}.zw = vec2(0.0);\n                  }\n                  xTexelC${r+2}Ready = 1;\n                }\n\n                xC${n} = vec4(xTexelC${r}.zw, xTexelC${r+2}.zw);\n              `,r+1<g&&(b+=`\n                  final = vec4(0.0);\n                  xCOffset = xC + 1 + ${d};\n                  if(xCOffset >= 0 && xCOffset < ${i}) {\n                    final = getX(batch, xR, xCOffset, d1);\n                  }\n                  xC${n+1} = vec4(xTexelC${r+2}.xy, final.xy);\n                `)):(b+=`\n                if(xC >= 0 && xC < ${i} && xTexelC${r}Ready == 0) {\n                  xTexelC${r} = getX(batch, xR, xC, d1);\n                  if (xC + 1 >= ${i}) {\n                    xTexelC${r}.zw = vec2(0.0);\n                  }\n                  xTexelC${r}Ready = 1;\n                }\n\n                xCOffset = xC + ${d};\n                if(xCOffset >= 0 && xCOffset < ${i} && xTexelC${r+2}Ready == 0) {\n                  xTexelC${r+2} = getX(batch, xR, xCOffset, d1);\n                  if (xCOffset + 1 >= ${i}) {\n                    xTexelC${r+2}.zw = vec2(0.);\n                  }\n                  xTexelC${r+2}Ready = 1;\n                }\n\n                xC${n} = vec4(\n                  xTexelC${r}.xy, xTexelC${r+2}.xy);\n              `,r+1<g&&(b+=`\n                  xC${n+1} = vec4(xTexelC${r}.zw, xTexelC${r+2}.zw);\n                `)));n<g&&(b+=`\n            wTexel = getW(${e}, ${r}, d1, q);\n            dotProd += xC${n} * vec4(wTexel.xz, wTexel.xz);\n          `,r+1<g&&(b+=`\n              wTexel = getW(${e}, ${r+1}, d1, q);\n              dotProd += xC${n+1} * vec4(wTexel.xz, wTexel.xz);\n            `))}b+="\n        }\n      "}let x="",y="";n&&(x=r?`vec4 activation(vec4 a) {\n          vec4 b = getPreluActivationWeightsAtOutCoords();\n          ${n}\n        }`:o?`vec4 activation(vec4 a) {\n          vec4 b = getLeakyreluAlphaAtOutCoords();\n          ${n}\n        }`:`vec4 activation(vec4 x) {\n          ${n}\n        }`,y="result = activation(result);");const v=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),o&&this.variableNames.push("leakyreluAlpha"),this.userCode=`\n      ${x}\n\n      const ivec2 strides = ivec2(${l}, ${d});\n      const ivec2 pads = ivec2(${u}, ${c});\n\n      void main() {\n\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / ${a};\n        int q = d2 - d1 * ${a};\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.\n        vec4 dotProd = vec4(0.000000000000001);\n\n        ${b}\n\n        vec4 result = dotProd - vec4(0.000000000000001);\n        ${v}\n        ${y}\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zu={kernelName:F.N,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,filter:s}=t,{strides:i,pad:u,dilations:l,dimRoundingMode:d}=r;let h=l;null==h&&(h=[1,1]),ce.assert(a.eitherStridesOrDilationsAreOne(i,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${h}'`);const p=a.computeConv2DInfo(o.shape,s.shape,i,h,u,d,!0);let f;return f=Object(c.b)().getBool("WEBGL_PACK_DEPTHWISECONV")&&p.strideWidth<=2&&p.outChannels/p.inChannels==1?new Vu(p):new Wu(p),n.runWebGLProgram(f,[o,s],"float32")}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Gu{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideHeight,n=e.strideWidth,r=e.padInfo.top,o=e.padInfo.left,a=e.outChannels/e.inChannels;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int dm = coords.w;\n        int d2 = d1 * ${a} + dm;\n\n        float dotProd = 0.0;\n\n        // TO DO: Vec4 over the batch size\n        for (int b = 0; b < ${e.batchSize}; b++) {\n          for (int yR = 0; yR < ${e.outHeight}; yR++) {\n            int xR = wR + yR * ${t} - ${r};\n\n            if (xR < 0 || xR >= ${e.inHeight}) {\n              continue;\n            }\n\n            for (int yC = 0; yC < ${e.outWidth}; yC++) {\n              int xC = wC + yC * ${n} - ${o};\n\n              if (xC < 0 || xC >= ${e.inWidth}) {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class Hu{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterHeight,n=e.filterWidth,r=e.strideHeight,o=e.strideWidth,a=t-1-e.padInfo.top,s=n-1-e.padInfo.left,i=e.outChannels/e.inChannels;this.userCode=`\n      const ivec2 pads = ivec2(${a}, ${s});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        float dotProd = 0.0;\n\n        for (int wR = 0; wR < ${t}; wR++) {\n          float dyR = float(dyRCorner + wR) / ${r}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = ${t} - 1 - wR;\n\n          for (int wC = 0; wC < ${n}; wC++) {\n            float dyC = float(dyCCorner + wC) / ${o}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = ${n} - 1 - wC;\n\n            // TO DO: Vec4 over the channelMul\n            for (int dm = 0; dm < ${i}; dm++) {\n              int d2 = d1 * ${i} + dm;\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, dm);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xu={kernelName:F.O,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,dy:s}=t,{strides:i,dilations:u,pad:c,dimRoundingMode:l,filterShape:d}=r,h=a.computeConv2DInfo(o.shape,d,i,u,c,l,!0),p=new Gu(h);return n.runWebGLProgram(p,[o,s],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ku={kernelName:F.P,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:o,filter:s}=t,{strides:i,dilations:u,pad:c,dimRoundingMode:l,inputShape:d}=r,h=a.computeConv2DInfo(d,s.shape,i,u,c,l,!0),p=new Hu(h);return n.runWebGLProgram(p,[o,s],"float32")}};
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class qu{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode="\n      void main() {\n          ivec2 coords = getOutputCoords();\n          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;\n          setOutput(val);\n      }\n    "}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yu={kernelName:F.Q,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{x:r}=t,o=[...r.shape,...r.shape],a=ce.sizeFromShape(r.shape),s=Ms({inputs:{x:r},backend:n,attrs:{shape:[a]}}),i=new qu(a),u=n.runWebGLProgram(i,[s],s.dtype),c=Ms({inputs:{x:u},backend:n,attrs:{shape:o}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(u),c}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Qu{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;const{inHeight:t,inWidth:n,padInfo:r,strideHeight:o,strideWidth:a,filterHeight:s,filterWidth:i,dilationHeight:u,dilationWidth:c}=e,{top:l,left:d}=r;this.userCode=`\n      const ivec2 strides = ivec2(${o}, ${a});\n      const ivec2 pads = ivec2(${l}, ${d});\n      const float neg_infinity = -3.4e38;\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        int d1 = coords.w;\n        ivec2 outTopLeftCorner =\n            coords.yz * strides - pads;\n        int hBeg = outTopLeftCorner.x;\n        int wBeg = outTopLeftCorner.y;\n\n        float curVal = neg_infinity;\n        for (int h = 0; h < ${s}; h++) {\n          int hIn = hBeg + h * ${u};\n\n          if (hIn >= 0 && hIn < ${t}) {\n            for (int w = 0; w < ${i}; w++) {\n              int wIn = wBeg + w * ${c};\n\n              if (wIn >= 0 && wIn < ${n}) {\n                float xVal = getX(batch, hIn, wIn, d1);\n                float wVal = getW(h, w, d1);\n\n                float val = xVal + wVal;\n                if (val > curVal) {\n                  curVal = val;\n                }\n              }\n            }\n          }\n        }\n\n        float result = curVal;\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zu={kernelName:F.R,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,filter:s}=t,{strides:i,pad:u,dilations:c}=r,l=a.computeDilation2DInfo(o.shape,s.shape,i,u,"NHWC",c);let d;const h=new Qu(l);d=n.runWebGLProgram(h,[o,s],"float32");const p=Ms({inputs:{x:d},backend:n,attrs:{shape:l.outShape}});return n.disposeIntermediateTensorInfo(d),p}};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ju={kernelName:F.S,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{equation:o}=r,s=t,{allDims:i,summedDims:u,idDims:c}=a.decodeEinsumEquation(o,s.length);a.checkEinsumDimSizes(i.length,c,s);const{path:l,steps:d}=a.getEinsumComputePath(u,c),h=d.length;let p=null,f=i.length;const g=[];for(let e=0;e<h;++e){for(const t of d[e]){const{permutationIndices:e,expandDims:r}=a.getEinsumPermutation(f,c[t]);let o;a.isIdentityPermutation(e)?o=s[t]:(o=qs({inputs:{x:s[t]},backend:n,attrs:{perm:e}}),g.push(o));const i=o.shape.slice();for(let e=0;e<r.length;++e)i.splice(r[e],0,1);ce.arraysEqual(o.shape,i)||(o=Ms({inputs:{x:o},backend:n,attrs:{shape:i}}),g.push(o)),null===p?p=o:(p=Ps({inputs:{a:o,b:p},backend:n}),g.push(p))}e<h-1&&(l[e]>=0&&(p=Xs({inputs:{x:p},backend:n,attrs:{axis:l[e]-(i.length-f),keepDims:!1}}),g.push(p)),f--)}for(const e of g)e!==p&&n.disposeIntermediateTensorInfo(e);return p}},ec=Ss({opSnippet:"return (x >= 0.0) ? x : (exp(x) - 1.0);",packedOpSnippet:"\n  vec4 result;\n\n  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);\n  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);\n  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);\n  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);\n\n  return result;\n"}),tc={kernelName:F.T,backendName:"webgl",kernelFunc:ec},nc={kernelName:F.U,backendName:"webgl",kernelFunc:e=>{const{inputs:t,backend:n}=e,{dy:r,y:o}=t,a=Object(c.b)().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new xs("\n  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));\n  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));\n",r.shape,o.shape):new bs("return (b >= 1.0) ? a : a * (b + 1.0);",r.shape,o.shape);return n.runWebGLProgram(a,[r,o],r.dtype)}},rc=Ts({opSnippet:"return float(a == b);",packedOpSnippet:"\n  return vec4(equal(a, b));\n",dtype:"bool"}),oc={kernelName:F.V,backendName:"webgl",kernelFunc:rc},ac=Ss({opSnippet:`\n  // Error function is calculated approximately with elementary function.\n  // See "Handbook of Mathematical Functions with Formulas,\n  // Graphs, and Mathematical Tables", Abramowitz and Stegun.\n  float p = ${a.ERF_P};\n  float a1 = ${a.ERF_A1};\n  float a2 = ${a.ERF_A2};\n  float a3 = ${a.ERF_A3};\n  float a4 = ${a.ERF_A4};\n  float a5 = ${a.ERF_A5};\n\n  float sign = sign(x);\n  x = abs(x);\n  float t = 1.0 / (1.0 + p * x);\n  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));\n`}),sc={kernelName:F.W,backendName:"webgl",kernelFunc:ac},ic="return exp(x);",uc=Ss({opSnippet:ic,packedOpSnippet:ic,cpuKernelImpl:Sa}),cc={kernelName:F.X,backendName:"webgl",kernelFunc:uc};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function lc(e){const{inputs:t,attrs:n,backend:r}=e,{dim:o}=n,{input:a}=t,s=a.shape.length,i=a.shape.slice();let u=o;return o<0&&(ce.assert(-(s+1)<=o,()=>`Axis must be in the interval [${-(s+1)}, ${s}]`),u=s+o+1),i.splice(u,0,1),Ms({inputs:{x:a},backend:r,attrs:{shape:i}})}const dc={kernelName:F.Y,backendName:"webgl",kernelFunc:lc},hc="return exp(x) - 1.0;",pc=Ss({opSnippet:hc,packedOpSnippet:hc,cpuKernelImpl:Ta}),fc={kernelName:F.Z,backendName:"webgl",kernelFunc:pc};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class gc{constructor(e,t,n){this.variableNames=["real","imag"];const r=t[1];this.outputShape=t;const o=n?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,a=n?r+".0":"1.0";let s;if("real"===e)s="return real * expR - imag * expI;";else{if("imag"!==e)throw new Error(`FFT component must be either "real" or "imag", got ${e}.`);s="return real * expI + imag * expR;"}this.userCode=`\n      const float exponentMultiplier = ${o};\n\n      float unaryOpComplex(float real, float expR, float imag, float expI) {\n        ${s}\n      }\n\n      float mulMatDFT(int batch, int index) {\n        float indexRatio = float(index) / float(${r});\n        float exponentMultiplierTimesIndexRatio =\n            exponentMultiplier * indexRatio;\n\n        float result = 0.0;\n\n        for (int i = 0; i < ${r}; i++) {\n          // x = (-2|2 * PI / N) * index * i;\n          float x = exponentMultiplierTimesIndexRatio * float(i);\n          float expR = cos(x);\n          float expI = sin(x);\n          float real = getReal(batch, i);\n          float imag = getImag(batch, i);\n\n          result +=\n              unaryOpComplex(real, expR, imag, expI) / ${a};\n        }\n\n        return result;\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        setOutput(mulMatDFT(coords[0], coords[1]));\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mc(e,t,n){const r=n.texData.get(e.dataId),o=ce.sizeFromShape(e.shape),a=e.shape[e.shape.length-1],s=Ms({inputs:{x:e},backend:n,attrs:{shape:[o/a,a]}}),i=s.shape,u=new gc("real",i,t),c=new gc("imag",i,t),l=[{dataId:r.complexTensorInfos.real.dataId,dtype:r.complexTensorInfos.real.dtype,shape:i},{dataId:r.complexTensorInfos.imag.dataId,dtype:r.complexTensorInfos.imag.dtype,shape:i}],d=n.runWebGLProgram(u,l,"float32"),h=n.runWebGLProgram(c,l,"float32"),p=ws({inputs:{real:d,imag:h},backend:n});n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(h);const f=Ms({inputs:{x:p},backend:n,attrs:{shape:e.shape}});return n.disposeIntermediateTensorInfo(s),n.disposeIntermediateTensorInfo(p),f}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bc={kernelName:F.ab,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{input:r}=t;return mc(r,!1,n)}};
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class xc{constructor(e,t){this.outputShape=[],this.variableNames=["x"],this.outputShape=e,this.userCode="\n      uniform float value;\n      void main() {\n        // Input can be obtained from uniform value.\n        setOutput(value);\n      }\n    "}getCustomSetupFunc(e){return(t,n)=>{null==this.valueLoc&&(this.valueLoc=t.getUniformLocationNoThrow(n,"value")),t.gl.uniform1f(this.valueLoc,e)}}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yc(e){const{backend:t,attrs:n}=e,{shape:r,value:o}=n;let{dtype:a}=n;if(a=a||ce.inferDtype(o),"string"===a){const e=ce.getArrayFromDType(a,ce.sizeFromShape(r));return e.fill(o),t.makeTensorInfo(r,a,e)}{const e=new xc(r,o),n=e.getCustomSetupFunc(o);return t.runWebGLProgram(e,[],a,n)}}const vc={kernelName:F.bb,backendName:"webgl",kernelFunc:yc};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class wc{constructor(e){this.variableNames=["Image"],this.outputShape=[];const t=e[2];this.outputShape=e,this.userCode=`\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int x = coords[2];\n\n          int coordX = ${t} - x;\n          float outputValue;\n          if(coordX >= 0 && coordX < ${t}) {\n            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);\n          } else {\n            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);\n          }\n          setOutput(outputValue);\n        }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cc={kernelName:F.cb,backendName:"webgl",kernelFunc:({inputs:e,backend:t})=>{const{image:n}=e,r=t,o=new wc(n.shape);return r.runWebGLProgram(o,[n],n.dtype)}},$c="return floor(x);",Ic=Ss({opSnippet:$c,packedOpSnippet:$c,cpuKernelImpl:Aa}),kc={kernelName:F.db,backendName:"webgl",kernelFunc:Ic},Ec=Ts({opSnippet:"\n  float s = sign(a) * sign(b);\n  int ia = round(a);\n  int ib = round(b);\n  if (ib != 0) {\n    // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n    return float(idiv(ia, ib, s));\n  } else {\n    return NAN;\n  }\n",packedOpSnippet:"\n  ivec4 ia = round(a);\n  ivec4 ib = round(b);\n  bvec4 cond = notEqual(ib, ivec4(0));\n  ivec4 result = ivec4(0);\n  vec4 s = sign(a) * sign(b);\n\n  // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n  if (cond[0]) {\n    result[0] = idiv(ia[0], ib[0], s[0]);\n  }\n  if (cond[1]) {\n    result[1] = idiv(ia[1], ib[1], s[1]);\n  }\n  if (cond[2]) {\n    result[2] = idiv(ia[2], ib[2], s[2]);\n  }\n  if (cond[3]) {\n    result[3] = idiv(ia[3], ib[3], s[3]);\n  }\n  return vec4(result);\n",dtype:"int32"}),Rc={kernelName:F.eb,backendName:"webgl",kernelFunc:Ec};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Oc{constructor(e){this.variableNames=["A"];const t=qr(),[n,r]=e;this.outputShape=e,this.userCode=`\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${r}.0, ${n}.0);\n\n        vec4 values = ${t.texture2D}(A, uv);\n        float value;\n        if (depth == 0) {\n          value = values.r;\n        } else if (depth == 1) {\n          value = values.g;\n        } else if (depth == 2) {\n          value = values.b;\n        } else if (depth == 3) {\n          value = values.a;\n        }\n\n        setOutput(floor(value * 255.0 + 0.5));\n      }\n    `}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Sc{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;const t=qr(),[n,r]=e;this.outputShape=e,this.userCode=`\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n\n        vec4 result = vec4(0.);\n\n        for(int row=0; row<=1; row++) {\n          for(int col=0; col<=1; col++) {\n            texC = coords[1] + row;\n            depth = coords[2] + col;\n\n            vec2 uv = (vec2(texC, texR) + halfCR) /\n                       vec2(${r}.0, ${n}.0);\n            vec4 values = ${t.texture2D}(A, uv);\n            float value;\n            if (depth == 0) {\n              value = values.r;\n            } else if (depth == 1) {\n              value = values.g;\n            } else if (depth == 2) {\n              value = values.b;\n            } else if (depth == 3) {\n              value = values.a;\n            }\n\n            result[row * 2 + col] = floor(value * 255.0 + 0.5);\n          }\n        }\n\n        ${t.output} = result;\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tc={kernelName:F.fb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e;let{pixels:o}=t;const{numChannels:a}=r,s="undefined"!=typeof HTMLVideoElement&&o instanceof HTMLVideoElement,i="undefined"!=typeof HTMLImageElement&&o instanceof HTMLImageElement,[u,l]=s?[o.videoWidth,o.videoHeight]:[o.width,o.height],d=[l,u],h=[l,u,a];(i||s)&&(null==Ac&&(Ac=document.createElement("canvas").getContext("2d")),Ac.canvas.width=u,Ac.canvas.height=l,Ac.drawImage(o,0,0,u,l),o=Ac.canvas);const p=n.makeTensorInfo(d,"int32");n.texData.get(p.dataId).usage=br.PIXELS,n.gpgpu.uploadPixelDataToTexture(n.getTexture(p.dataId),o);const f=Object(c.b)().getBool("WEBGL_PACK")?new Sc(h):new Oc(h),g=n.runWebGLProgram(f,[p],"int32");return n.disposeData(p.dataId),g}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */};let Ac;const Nc={kernelName:F.hb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,filter:s,bias:i,preluActivationWeights:u}=t,{strides:l,pad:d,dataFormat:h,dilations:p,dimRoundingMode:f,activation:g,leakyreluAlpha:m}=r,b=a.convertConv2DDataFormat(h),x=a.computeConv2DInfo(o.shape,s.shape,l,p,d,f,!1,b);let y;const v=[];if(1!==x.filterHeight||1!==x.filterWidth||1!==x.dilationHeight||1!==x.dilationWidth||1!==x.strideHeight||1!==x.strideWidth||"SAME"!==x.padInfo.type&&"VALID"!==x.padInfo.type)if(Object(c.b)().getBool("WEBGL_CONV_IM2COL")&&1===o.shape[0])y=xu({x:o,filter:s,convInfo:x,backend:n,bias:i,activation:g,preluActivationWeights:u,leakyreluAlpha:m});else{const e=null!=i,t=null!=u,r="leakyrelu"===g,a=g?As(g,!1):null,c=new fu(x,e,a,t,r),l=[o,s];if(i&&l.push(i),u&&l.push(u),r){const e=n.makeTensorInfo([],"float32",ce.createScalarValue(m,"float32"));l.push(e),v.push(e)}y=n.runWebGLProgram(c,l,"float32")}else y=bu({x:o,filter:s,convInfo:x,backend:n,bias:i,activation:g,preluActivationWeights:u,leakyreluAlpha:m});const w=Ms({inputs:{x:y},backend:n,attrs:{shape:x.outShape}});return v.push(y),v.forEach(e=>n.disposeIntermediateTensorInfo(e)),w}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fc={kernelName:F.ib,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,filter:s,bias:i,preluActivationWeights:u}=t,{strides:l,pad:d,dilations:h,dimRoundingMode:p,activation:f,leakyreluAlpha:g}=r,m=[];let b=h;null==b&&(b=[1,1]),ce.assert(a.eitherStridesOrDilationsAreOne(l,b),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${l} and dilations '${b}'`);const x=a.computeConv2DInfo(o.shape,s.shape,l,b,d,p,!0),y=Object(c.b)().getBool("WEBGL_PACK_DEPTHWISECONV")&&x.strideWidth<=2&&x.outChannels/x.inChannels==1,v=f?As(f,y):null,w=[o,s],C=null!=i,$=null!=u,I="leakyrelu"===f;if(C&&w.push(i),$&&w.push(u),I){const e=n.makeTensorInfo([],"float32",ce.createScalarValue(g,"float32"));w.push(e),m.push(e)}let k;k=y?new Vu(x,C,v,$,I):new Wu(x,C,v,$,I);const E=n.runWebGLProgram(k,w,"float32");return m.forEach(e=>n.disposeIntermediateTensorInfo(e)),E}};class _c{constructor(e,t,n){this.sliceDim=e,this.strides=t,this.variableNames=["x","indices"],this.outputShape=n;const r=Oo(t.length),o=Oo(n.length),a=this.sliceDim>1?"strides[j]":"strides";this.userCode=`\n        ${r} strides = ${r}(${this.strides});\n         void main() {\n          ${o} coords = getOutputCoords();\n          int flattenIndex = 0;\n          for (int j = 0; j < ${this.sliceDim}; j++) {\n            int index = round(getIndices(coords[0], j));\n            flattenIndex += index * ${a};\n          }\n          setOutput(getX(flattenIndex, coords[1]));\n        }\n      `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Dc={kernelName:F.jb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{params:r,indices:o}=t,s=o.shape,i=s[s.length-1],[u,c,l,d]=a.prepareAndValidate(r,o),h=Ms({inputs:{x:o},backend:n,attrs:{shape:[c,i]}}),p=Ms({inputs:{x:r},backend:n,attrs:{shape:[ce.sizeFromShape(r.shape)/l,l]}}),f=new _c(i,d,[c,l]),g=n.runWebGLProgram(f,[p,h],p.dtype),m=Ms({inputs:{x:g},backend:n,attrs:{shape:u}});return n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(g),m}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Lc{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;const n=Oo(this.rank),r=function(e,t){const n=["resRC.x","resRC.y","resRC.z","resRC.w"],r=[];for(let t=0;t<e.length;t++)2===t?r.push("int(getIndices(resRC.x, resRC.z))"):r.push(""+n[t]);return r.join()}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e);this.userCode=`\n      void main() {\n        ${n} resRC = getOutputCoords();\n        setOutput(getA(${r}));\n      }\n    `}}const Pc={kernelName:F.kb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,indices:s}=t,{axis:i,batchDims:u}=r,c=ce.parseAxisParam(i,o.shape)[0],l=a.segment_util.collectGatherOpShapeInfo(o,s,c,u),d=ce.sizeFromShape(s.shape),h=[],p=Ms({inputs:{x:o},backend:n,attrs:{shape:[l.batchSize,l.outerSize,l.dimSize,l.sliceSize]}}),f=Ms({inputs:{x:s},backend:n,attrs:{shape:[l.batchSize,d/l.batchSize]}});h.push(p),h.push(f);const g=[l.batchSize,l.outerSize,d/l.batchSize,l.sliceSize];if(n.shouldExecuteOnCPU([o,s])||"string"===o.dtype){const e=n.bufferSync(f),t=n.bufferSync(p),r=Na(t,e,g);return h.forEach(e=>n.disposeIntermediateTensorInfo(e)),n.makeTensorInfo(l.outputShape,r.dtype,r.values)}const m=new Lc(p.shape,g),b=n.runWebGLProgram(m,[p,f],p.dtype);h.push(b);const x=Ms({inputs:{x:b},backend:n,attrs:{shape:l.outputShape}});return h.forEach(e=>n.disposeIntermediateTensorInfo(e)),x}},Bc=Ts({opSnippet:"return float(a > b);",packedOpSnippet:"\n  return vec4(greaterThan(a, b));\n",cpuKernelImpl:Fa,dtype:"bool"}),Mc={kernelName:F.lb,backendName:"webgl",kernelFunc:Bc},jc=Ts({opSnippet:"return float(a >= b);",packedOpSnippet:"\n  return vec4(greaterThanEqual(a, b));\n",dtype:"bool"}),Uc={kernelName:F.mb,backendName:"webgl",kernelFunc:jc};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wc={kernelName:F.nb,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,backend:n}=e,{input:r}=t;return mc(r,!0,n)}},Vc=Ss({opSnippet:"return float(!isnan(x) && !isinf(x));",dtype:"bool"}),zc={kernelName:F.qb,backendName:"webgl",kernelFunc:Vc},Gc=Ss({opSnippet:"return float(isinf(x));",dtype:"bool"}),Hc={kernelName:F.rb,backendName:"webgl",kernelFunc:Gc},Xc=Ss({opSnippet:"return float(isnan(x));",dtype:"bool"}),Kc={kernelName:F.sb,backendName:"webgl",kernelFunc:Xc},qc=Ts({opSnippet:"return float(a < b);",packedOpSnippet:"\n  return vec4(lessThan(a, b));\n",cpuKernelImpl:_a,dtype:"bool"}),Yc={kernelName:F.wb,backendName:"webgl",kernelFunc:qc},Qc=Ts({opSnippet:"return float(a <= b);",packedOpSnippet:"\n  return vec4(lessThanEqual(a, b));\n",dtype:"bool"}),Zc={kernelName:F.xb,backendName:"webgl",kernelFunc:Qc};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jc={kernelName:F.yb,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{backend:t,attrs:n}=e,{start:r,stop:o,num:a}=n,s=Da(r,o,a);return t.makeTensorInfo([s.length],"float32",s)}},el=Ss({opSnippet:"if (x < 0.0) return NAN;\n  return log(x);",packedOpSnippet:"\n  vec4 result = log(x);\n  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));\n  result.r = isNaN.r == 1.0 ? NAN : result.r;\n  result.g = isNaN.g == 1.0 ? NAN : result.g;\n  result.b = isNaN.b == 1.0 ? NAN : result.b;\n  result.a = isNaN.a == 1.0 ? NAN : result.a;\n\n  return result;\n",cpuKernelImpl:La}),tl={kernelName:F.zb,backendName:"webgl",kernelFunc:el},nl=Ss({opSnippet:"return log(1.0 + x);"}),rl={kernelName:F.Ab,backendName:"webgl",kernelFunc:nl},ol=Ts({opSnippet:"return float(a >= 1.0 && b >= 1.0);",packedOpSnippet:"\n  return vec4(\n    vec4(greaterThanEqual(a, vec4(1.0))) *\n    vec4(greaterThanEqual(b, vec4(1.0))));\n",dtype:"bool"}),al={kernelName:F.Bb,backendName:"webgl",kernelFunc:ol},sl=Ss({opSnippet:"return float(!(x >= 1.0));"}),il={kernelName:F.Cb,backendName:"webgl",kernelFunc:sl},ul=Ts({opSnippet:"return float(a >= 1.0 || b >= 1.0);",packedOpSnippet:"\n  return min(\n    vec4(greaterThanEqual(a, vec4(1.0))) +\n    vec4(greaterThanEqual(b, vec4(1.0))),\n    vec4(1.0));\n",dtype:"bool"}),cl={kernelName:F.Db,backendName:"webgl",kernelFunc:ul};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class ll{constructor(e,t,n,r,o){this.variableNames=["x"],this.outputShape=[];const a=t,s=e[3]-1;let i;this.outputShape=e;const u=`float(${n}) + float(${r}) * sum`;i=.5===o?`inversesqrt(${u})`:1===o?`1.0/(${u})`:`exp(log(${u}) * float(-${o}));`,this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n        int d = coords[3];\n        float x = getX(b, r, c, d);\n        float sum = 0.0;\n        for (int j = -${a}; j <= ${a}; j++) {\n          int idx = d + j;\n          if (idx >= 0 && idx <=  ${s}) {\n            float z = getX(b, r, c, idx);\n            sum += z * z;\n          }\n        }\n        float val = x * ${i};\n        setOutput(val);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class dl{constructor(e,t,n,r,o){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;const a=t,s=e[3]-1;let i;this.outputShape=e;const u=`float(${n}) + float(${r}) * sum`;i=.5===o?`inversesqrt(${u})`:1===o?`1.0/(${u})`:`exp(log(${u}) * float(-${o}));`,this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords.x;\n        int r = coords.y;\n        int c = coords.z;\n        int d = coords.w;\n\n        bool hasNextCol = d < ${this.outputShape[3]};\n        bool hasNextRow = c < ${this.outputShape[2]};\n\n        vec4 sum = vec4(0.);\n        vec4 xFragAtOutputCoords = getX(b, r, c, d);\n\n        vec4 xAtOutputCoords = vec4(\n          getChannel(xFragAtOutputCoords, vec2(c, d)),\n          hasNextCol ?\n            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,\n          hasNextRow ?\n            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0\n        );\n\n        int firstChannel = d - ${a};\n        vec2 cache = vec2(0.);\n        if(firstChannel >= 0){\n          vec4 firstChannelFrag = getX(b, r, c, firstChannel);\n          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));\n            if(hasNextRow){\n              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));\n            }\n        }\n\n        ivec2 depth = ivec2(d, d + 1);\n        for (int j = - ${a}; j <= ${a}; j++) {\n          ivec2 idx = depth + j;\n          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));\n          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${s}));\n\n          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;\n          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;\n\n          if(depthInRange || depthPlusOneInRange){\n            vec4 z = vec4(0.);\n            vec4 xFragAtCurrentDepth;\n            z.xz = cache.xy;\n            if(depthPlusOneInRange && hasNextCol){\n              xFragAtCurrentDepth = idx.y != d ?\n                getX(b, r, c, idx.y) : xFragAtOutputCoords;\n              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));\n              if(hasNextRow){\n                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));\n              }\n            }\n            cache.xy = z.yw;\n            sum += z * z;\n          }\n        }\n        vec4 result = xAtOutputCoords * ${i};\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hl={kernelName:F.tb,backendName:"webgl",kernelFunc:e=>{const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{depthRadius:a,bias:s,alpha:i,beta:u}=r,l=Object(c.b)().getBool("WEBGL_PACK_NORMALIZATION")?new dl(o.shape,a,s,i,u):new ll(o.shape,a,s,i,u);return n.runWebGLProgram(l,[o],o.dtype)}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class pl{constructor(e,t,n,r,o){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=n,this.alpha=r,this.beta=o,this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n\n        float result = 0.0;\n        for (int d = 0; d < ${this.depth}; ++d) {\n          int depthBegin = int(max(0.0, float(d - ${t})));\n          int depthEnd = int(min(float(${this.depth}),\n              float(d + ${t} + 1)));\n\n          const int MIN_DEPTH_BEGIN = 0;\n          const int MAX_DEPTH_END = ${this.depth};\n\n          float norm = 0.0;\n          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {\n            if (k < depthBegin){\n              continue;\n            }\n            else if (k >= depthBegin && k < depthEnd) {\n              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);\n            }\n            else {\n              break;\n            }\n          }\n\n          norm = float(${r}) * norm + float(${n});\n\n          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){\n            if (k < depthBegin){\n              continue;\n            }\n            else if (k >= depthBegin && k < depthEnd){\n              float dyi = -2.0 * float(${r})\n                * float(${o})\n                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)\n                / norm;\n              if (k == d) {\n                dyi += pow(norm, -1.0 * ${o});\n              }\n              if (k == coords[3]) {\n                dyi *= getDy(b, r, c, d);\n                result += dyi;\n              }\n            }\n            else {\n              break;\n            }\n          }\n      }\n      setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fl={kernelName:F.ub,backendName:"webgl",kernelFunc:e=>{const{inputs:t,backend:n,attrs:r}=e,{x:o,y:a,dy:s}=t,{depthRadius:i,bias:u,alpha:c,beta:l}=r,d=new pl(o.shape,i,u,c,l);return n.runWebGLProgram(d,[o,a,s],o.dtype)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function gl(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{reductionIndices:s,keepDims:i}=r,u=o.shape.length,c=ce.parseAxisParam(s,o.shape);let l=c;const d=a.getAxesPermutation(l,u),h=null!=d,p=n.shouldExecuteOnCPU([o]);let f=o;if(h){if(p){const e=n.texData.get(f.dataId).values,t=new Array(u);for(let e=0;e<t.length;e++)t[e]=o.shape[d[e]];const r=Ja(e,o.shape,o.dtype,d,t);f=n.makeTensorInfo(t,o.dtype);n.texData.get(f.dataId).values=r}else f=Hs(o,d,n);l=a.getInnerMostAxes(l.length,u)}a.assertAxesAreInnerMostDims("max",l,u);const[g,m]=a.computeOutAndReduceShapes(f.shape,l);let b,x=g;if(i&&(x=a.expandShapeToKeepDim(g,c)),p){const e=n.texData.get(f.dataId).values,t=Pa(e,ce.sizeFromShape(m),x,o.dtype);b=n.makeTensorInfo(x,o.dtype);n.texData.get(b.dataId).values=t}else b=
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r){const o=ce.sizeFromShape(t),a=Ms({inputs:{x:e},attrs:{shape:[ce.sizeFromShape(e.shape)/o,o]},backend:r}),s=Vs(a,e.dtype,"max",r),i=Ms({inputs:{x:s},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(s),i}(f,m,x,n);return h&&n.disposeIntermediateTensorInfo(f),b}const ml={kernelName:F.Eb,backendName:"webgl",kernelFunc:gl},bl=Ts({opSnippet:"\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return max(a, b);\n",packedOpSnippet:"\n  vec4 result = vec4(max(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",cpuKernelImpl:Ba}),xl={kernelName:F.Kb,backendName:"webgl",kernelFunc:bl};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yl={kernelName:F.Fb,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t;Xr(o,"maxPool");const{filterSize:s,strides:i,pad:u,dimRoundingMode:c}=r;ce.assert(a.eitherStridesOrDilationsAreOne(i,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '1'`);const l=a.computePool2DInfo(o.shape,s,i,1,u,c);if(1===l.filterWidth&&1===l.filterHeight&&ce.arraysEqual(l.inShape,l.outShape))return ys({inputs:{x:o},backend:n});const d=new Ri(l,"max",!1);return n.runWebGLProgram(d,[o],o.dtype)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vl={kernelName:F.Gb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{filterSize:s,strides:i,pad:u,dataFormat:c,dimRoundingMode:l}=r,d=a.computePool3DInfo(o.shape,s,i,[1,1,1],u,l,c),h=new Oi(d,"max",!1);return n.runWebGLProgram(h,[o],o.dtype)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class wl{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;const t=e.strideHeight,n=e.strideWidth,r=e.dilationHeight,o=e.effectiveFilterHeight,a=e.effectiveFilterWidth,s=o-1-e.padInfo.top,i=a-1-e.padInfo.left,u=o*a-1;this.userCode=`\n      const ivec2 pads = ivec2(${s}, ${i});\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < ${o};\n          wR += ${r}) {\n          float dyR = float(dyRCorner + wR) / ${t}.0;\n\n          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < ${a}; wC++) {\n            float dyC = float(dyCCorner + wC) / ${n}.0;\n\n            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n            int maxPosValue = ${u} - int(getMaxPos(b, idyR, idyC, d));\n\n            // Get the current value, check it against the value from the\n            // position matrix.\n            int curPosValue = wR * ${a} + wC;\n            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n            dotProd += dyValue * mask;\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}class Cl{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;const t=e.strideDepth,n=e.strideHeight,r=e.strideWidth,o=e.dilationDepth,a=e.dilationHeight,s=e.dilationWidth,i=e.effectiveFilterDepth,u=e.effectiveFilterHeight,c=e.effectiveFilterWidth,l=i-1-e.padInfo.front,d=u-1-e.padInfo.top,h=c-1-e.padInfo.left,p=i*u*c-1;this.userCode=`\n      const ivec3 pads = ivec3(${l}, ${d}, ${h});\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyDCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get\n        // dx(xD, xR, xC, ch).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int wD = 0; wD < ${i};\n           wD += ${o}) {\n          float dyD = float(dyDCorner + wD) / ${t}.0;\n\n          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {\n            continue;\n          }\n          int idyD = int(dyD);\n\n          for (int wR = 0; wR < ${u};\n              wR += ${a}) {\n            float dyR = float(dyRCorner + wR) / ${n}.0;\n\n            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||\n                fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            for (int wC = 0; wC < ${c};\n                wC += ${s}) {\n              float dyC = float(dyCCorner + wC) / ${r}.0;\n\n              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              float dyValue = getDy(batch, idyD, idyR, idyC, ch);\n              int maxPosValue = ${p} -\n                  int(getMaxPos(batch, idyD, idyR, idyC, ch));\n\n              // Get the current value, check it against the value from the\n              // position matrix.\n              int curPosValue =\n                  wD * ${u} * ${c} +\n                  wR * ${c} + wC;\n              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n              dotProd += dyValue * mask;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $l={kernelName:F.Hb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:o,input:s}=t,i=s,{filterSize:u,strides:c,pad:l,dimRoundingMode:d}=r,h=a.computePool3DInfo(i.shape,u,c,[1,1,1],l,d),p=new Oi(h,"max",!0),f=n.runWebGLProgram(p,[i],i.dtype),g=new Cl(h),m=n.runWebGLProgram(g,[o,f],i.dtype);return n.disposeIntermediateTensorInfo(f),m}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Il={kernelName:F.Ib,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{dy:o,input:s,output:i}=t,u=s;Xr([s,i],"maxPoolGrad");const{filterSize:c,strides:l,pad:d,dimRoundingMode:h}=r,p=a.computePool2DInfo(u.shape,c,l,1,d,h),f=new Ri(p,"max",!0),g=n.runWebGLProgram(f,[u],u.dtype),m=new wl(p),b=n.runWebGLProgram(m,[o,g],u.dtype);return n.disposeIntermediateTensorInfo(g),b}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const kl={kernelName:F.Jb,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:r}=e,{filterSize:o,strides:s,pad:i,includeBatchInIndex:u}=t,c=n;ce.assert(4===r.shape.length,()=>`Error in maxPool: input must be rank 4 but got rank ${r.shape.length}.`);const l=[1,1];ce.assert(a.eitherStridesOrDilationsAreOne(s,l),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${l}'`);const d=a.computePool2DInfo(r.shape,o,s,l,i),[h,p]=function(e,t,n,r){let o=new Ri(n,"max",!1);const a=r.runWebGLProgram(o,[e],"float32");return o=new Ri(n,"max",!0,!0,t),[a,r.runWebGLProgram(o,[e],"float32")]}(r,u,d,c);return[h,p]}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const El={kernelName:F.Lb,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:r}=e,{keepDims:o,axis:s}=t,i=n,u=r.shape.length,c=ce.parseAxisParam(s,r.shape);let l=c;const d=a.getAxesPermutation(l,u),h=null!=d,p=i.shouldExecuteOnCPU([r]),f=[];let g=r;if(h){if(p){const e=i.texData.get(g.dataId).values,t=new Array(u);for(let e=0;e<t.length;e++)t[e]=r.shape[d[e]];const n=Ja(e,r.shape,r.dtype,d,t);g=i.makeTensorInfo(t,r.dtype);i.texData.get(g.dataId).values=n}else g=Hs(r,d,i);f.push(g),l=a.getInnerMostAxes(l.length,u)}a.assertAxesAreInnerMostDims("sum",l,u);const[m,b]=a.computeOutAndReduceShapes(g.shape,l);let x=m;o&&(x=a.expandShapeToKeepDim(m,c));const y=function(e,t,n,r){const o=ce.sizeFromShape(t),a=Ms({inputs:{x:e},attrs:{shape:[ce.sizeFromShape(e.shape)/o,o]},backend:r}),s=Vs(a,"float32","mean",r),i=Ms({inputs:{x:s},attrs:{shape:n},backend:r});return r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(s),i}(g,b,x,i);for(const e of f)i.disposeIntermediateTensorInfo(e);return y}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rl={kernelName:F.Mb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s,keepDims:i}=r,u=o.shape.length,c=ce.parseAxisParam(s,o.shape);let l=c;const d=a.getAxesPermutation(l,u);let h=o;null!=d&&(h=qs({inputs:{x:o},backend:n,attrs:{perm:d}}),l=a.getInnerMostAxes(l.length,o.shape.length)),a.assertAxesAreInnerMostDims("min",l,u);const[p,f]=a.computeOutAndReduceShapes(h.shape,l),g=Ms({inputs:{x:h},backend:n,attrs:{shape:[-1,ce.sizeFromShape(f)]}}),m=Vs(g,g.dtype,"min",n);let b;if(i){b=Ms({inputs:{x:m},backend:n,attrs:{shape:a.expandShapeToKeepDim(p,c)}})}else b=Ms({inputs:{x:m},backend:n,attrs:{shape:p}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(m),null!=d&&n.disposeIntermediateTensorInfo(h),b}},Ol=Ts({opSnippet:"\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return min(a, b);\n",packedOpSnippet:"\n  vec4 result = vec4(min(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",cpuKernelImpl:Ma}),Sl={kernelName:F.Nb,backendName:"webgl",kernelFunc:Ol};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Tl{constructor(e,t,n){this.variableNames=["x"],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Oo(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r),u="reflect"===n?0:1;this.userCode=1!==r?`\n      ${o} start = ${o}(${a});\n      ${o} end = ${o}(${s});\n\n      void main() {\n        ${o} outC = getOutputCoords();\n        for (int i = 0; i < ${r}; i++) {\n          if (outC[i] < start[i]) {\n            outC[i] = start[i] * 2 - outC[i] - ${u};\n          } else if(outC[i] >= end[i]) {\n            outC[i] = (end[i] - 1) * 2 - outC[i] + ${u};\n          }\n        }\n        ${o} coords = outC - start;\n        setOutput(getX(${i}));\n      }\n    `:`\n        int start = ${a};\n        int end = ${s};\n\n        void main() {\n          int outC = getOutputCoords();\n          if (outC < start) {\n            outC = start * 2 - outC - ${u};\n          } else if(outC >= end) {\n            outC = (end - 1) * 2 - outC + ${u};\n          }\n          setOutput(getX(outC - start));\n        }\n      `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Al{constructor(e,t,n){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Oo(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=ns("rc",r),u=ns("source",r),c=`${i[r-1]} < ${this.outputShape[r-1]}`,l=1===r?"source":`vec2(${u.slice(-2).join()})`,d="reflect"===n?0:1;let h="";if(1===r){const e=`\n        ${o} source = rc;\n        if (source < start) {\n          source = start * 2 - source - ${d};\n        } else if (source >= end) {\n          source = (end - 1) * 2 - source + ${d};\n        }\n        source -= start;\n      `;h=`\n        ${o} rc = outputLoc;\n        ${e}\n        result[0] = getChannel(getX(${u.join()}), ${l});\n        ${i[r-1]} += 1;\n        if(${c}) {\n          ${e}\n          result[1] = getChannel(getX(${u.join()}), ${l});\n        }\n      `}else{const e=`\n        ${o} source = rc;\n        ${o} lt = ${o}(lessThan(source, start));\n        ${o} gte = ${o}(greaterThanEqual(source, end));\n        ${o} orig = 1 - (lt + gte);\n        source = orig * source +\n                lt * (start * 2 - source - ${d}) +\n                gte * ((end - 1) * 2 - source + ${d});\n        source -= start;\n      `;h=`\n        ${o} rc = outputLoc;\n        ${e}\n        result[0] = getChannel(getX(${u.join()}), ${l});\n        ${i[r-1]} += 1;\n        if(${c}) {\n          ${e}\n          result[1] = getChannel(getX(${u.join()}), ${l});\n        }\n        rc = outputLoc;\n        ${i[r-2]} += 1;\n        if(${i[r-2]} < ${this.outputShape[r-2]}) {\n          ${e}\n          result[2] = getChannel(getX(${u.join()}), ${l});\n          ${i[r-1]} += 1;\n          if(${c}) {\n            ${e}\n            result[3] = getChannel(getX(${u.join()}), ${l});\n          }\n        }\n      `}this.userCode=`\n      const ${o} start = ${o}(${a});\n      const ${o} end = ${o}(${s});\n\n      void main() {\n        ${o} outputLoc = getOutputCoords();\n        vec4 result = vec4(0.);\n        ${h}\n        setOutput(result);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nl={kernelName:F.Ob,backendName:"webgl",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:r}=e,{paddings:o,mode:a}=n,s=Object(c.b)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Al(r.shape,o,a):new Tl(r.shape,o,a);return t.runWebGLProgram(s,[r],r.dtype)}},Fl=Ts({opSnippet:"if (b == 0.0) return NAN;\n  return mod(a, b);",packedOpSnippet:"\n  vec4 result = mod(a, b);\n  vec4 isNaN = vec4(equal(b, vec4(0.0)));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n"}),_l={kernelName:F.Pb,backendName:"webgl",kernelFunc:Fl};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Dl{constructor(e,t,n){this.variableNames=["probs"],this.outputShape=[e,n],this.userCode=`\n      uniform float seed;\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n\n        float r = random(seed);\n        float cdf = 0.0;\n\n        for (int i = 0; i < ${t-1}; i++) {\n          cdf += getProbs(batch, i);\n\n          if (r < cdf) {\n            setOutput(float(i));\n            return;\n          }\n        }\n\n        // If no other event happened, last event happened.\n        setOutput(float(${t-1}));\n      }\n    `}getCustomSetupFunc(e){return(t,n)=>{null==this.seedLoc&&(this.seedLoc=t.getUniformLocation(n,"seed")),t.gl.uniform1f(this.seedLoc,e)}}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ll=Ts({opSnippet:"\nif (a == b) {\n  return 1.0;\n};\nreturn a / b;",packedOpSnippet:"\n  // vec4 one = vec4(equal(a, b));\n  // return one + (vec4(1.0) - one) * a / b;\n  vec4 result = a / b;\n  if(a.x == b.x) {\n    result.x = 1.;\n  }\n  if(a.y == b.y) {\n    result.y = 1.;\n  }\n  if(a.z == b.z) {\n    result.z = 1.;\n  }\n  if(a.w == b.w) {\n    result.w = 1.;\n  }\n\n  return result;\n",checkOutOfBounds:!0}),Pl={kernelName:F.gc,backendName:"webgl",kernelFunc:Ll},Bl="return a - b;",Ml=Ts({opSnippet:Bl,packedOpSnippet:Bl,supportsComplex:!0,cpuKernelImpl:Ya}),jl={kernelName:F.Nc,backendName:"webgl",kernelFunc:Ml};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Ul(e){const{inputs:t,backend:n,attrs:r}=e,{logits:o}=t,{dim:s}=r,i=ce.parseAxisParam([s],o.shape),u=gl({inputs:{x:o},backend:n,attrs:{reductionIndices:i,keepDims:!1}}),c=a.expandShapeToKeepDim(u.shape,i),l=Ms({inputs:{x:u},backend:n,attrs:{shape:c}}),d=Ml({inputs:{a:o,b:l},backend:n}),h=uc({inputs:{x:d},backend:n}),p=Xs({inputs:{x:h},backend:n,attrs:{axis:i,keepDims:!1}}),f=Ms({inputs:{x:p},backend:n,attrs:{shape:c}}),g=Ll({inputs:{a:h,b:f},backend:n});return n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(l),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(f),g}const Wl={kernelName:F.Bc,backendName:"webgl",kernelFunc:Ul};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vl={kernelName:F.Qb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{logits:o}=t,{numSamples:a,seed:s,normalized:i}=r,u=i?o:Ul({inputs:{logits:o},backend:n,attrs:{dim:o.shape.length-1}}),c=u.shape[0],l=u.shape[1],d=new Dl(c,l,a),h=d.getCustomSetupFunc(s),p=n.runWebGLProgram(d,[u],"int32",h);return i||n.disposeIntermediateTensorInfo(u),p}},zl="return -x;";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gl={kernelName:F.Sb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{x:r}=t;if(n.shouldExecuteOnCPU([r])){const e=n.texData.get(r.dataId),[t,o]=Ua(e.values,r.shape,r.dtype);return n.makeTensorInfo(o,r.dtype,t)}let o;return o=Object(c.b)().getBool("WEBGL_PACK_UNARY_OPERATIONS")?new hs(r.shape,zl):new cs(r.shape,zl),n.runWebGLProgram(o,[r],r.dtype)}},Hl=s.nonMaxSuppressionV3Impl;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xl={kernelName:F.Tb,backendName:"webgl",kernelFunc:function(e){a.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:t,backend:n,attrs:r}=e,{boxes:o,scores:s}=t,{maxOutputSize:i,iouThreshold:u,scoreThreshold:c}=r,l=n.readSync(o.dataId),d=n.readSync(s.dataId),{selectedIndices:h}=Hl(l,d,i,u,c);return n.makeTensorInfo([h.length],"int32",new Int32Array(h))}},Kl=s.nonMaxSuppressionV4Impl;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ql={kernelName:F.Ub,backendName:"webgl",kernelFunc:function(e){a.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:t,backend:n,attrs:r}=e,{boxes:o,scores:s}=t,{maxOutputSize:i,iouThreshold:u,scoreThreshold:c,padToMaxOutputSize:l}=r,d=n.readSync(o.dataId),h=n.readSync(s.dataId),{selectedIndices:p,validOutputs:f}=Kl(d,h,i,u,c,l);return[n.makeTensorInfo([p.length],"int32",new Int32Array(p)),n.makeTensorInfo([],"int32",new Int32Array([f]))]}},Yl=s.nonMaxSuppressionV5Impl;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ql={kernelName:F.Vb,backendName:"webgl",kernelFunc:function(e){a.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:t,backend:n,attrs:r}=e,{boxes:o,scores:s}=t,{maxOutputSize:i,iouThreshold:u,scoreThreshold:c,softNmsSigma:l}=r,d=n.readSync(o.dataId),h=n.readSync(s.dataId),p=i,f=u,g=c,m=l,{selectedIndices:b,selectedScores:x}=Yl(d,h,p,f,g,m);return[n.makeTensorInfo([b.length],"int32",new Int32Array(b)),n.makeTensorInfo([x.length],"float32",new Float32Array(x))]}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Zl{constructor(e,t,n,r){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int index = round(getIndices(coords.x));\n        setOutput(mix(float(${r}), float(${n}),\n                      float(index == coords.y)));\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jl={kernelName:F.Xb,backendName:"webgl",kernelFunc:e=>{const{inputs:t,backend:n,attrs:r}=e,{indices:o}=t,{depth:a,onValue:s,offValue:i}=r,u=ce.sizeFromShape(o.shape),c=new Zl(u,a,s,i),l=Ms({inputs:{x:o},backend:n,attrs:{shape:[u]}}),d=n.runWebGLProgram(c,[l],o.dtype);n.disposeIntermediateTensorInfo(l);const h=Ms({inputs:{x:d},backend:n,attrs:{shape:[...o.shape,a]}});return n.disposeIntermediateTensorInfo(d),h}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function ed(e){const{inputs:t,backend:n}=e,{x:r}=t;if("complex64"===r.dtype){const e=Ki({inputs:{input:r},backend:n}),t=ed({inputs:{x:e},backend:n}),o=cu({inputs:{input:r},backend:n}),a=ed({inputs:{x:o},backend:n}),s=ws({inputs:{real:t,imag:a},backend:n});return n.disposeIntermediateTensorInfo(e),n.disposeIntermediateTensorInfo(t),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(a),s}return yc({attrs:{shape:r.shape,dtype:r.dtype,value:"string"===r.dtype?"":0},backend:n})}const td={kernelName:F.Yc,backendName:"webgl",kernelFunc:ed};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nd={kernelName:F.Yb,backendName:"webgl",kernelFunc:function e(t){const{inputs:n,backend:r}=t,{x:o}=n;if("string"===o.dtype)throw new Error("onesLike is not supported under string dtype");if("complex64"===o.dtype){const t=Ki({inputs:{input:o},backend:r}),n=e({inputs:{x:t},backend:r}),a=cu({inputs:{input:o},backend:r}),s=ed({inputs:{x:a},backend:r}),i=ws({inputs:{real:n,imag:s},backend:r});return r.disposeIntermediateTensorInfo(t),r.disposeIntermediateTensorInfo(n),r.disposeIntermediateTensorInfo(a),r.disposeIntermediateTensorInfo(s),i}return yc({attrs:{shape:o.shape,dtype:o.dtype,value:1},backend:r})}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rd={kernelName:F.Zb,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{axis:o}=r;if(1===t.length)return lc({inputs:{input:t[0]},backend:n,attrs:{dim:o}});const a=t[0].shape,s=t[0].dtype;t.forEach(e=>{ce.assertShapesMatch(a,e.shape,"All tensors passed to stack must have matching shapes"),ce.assert(s===e.dtype,()=>"All tensors passed to stack must have matching dtypes")});const i=[],u=hu({inputs:t.map(e=>{const t=lc({inputs:{input:e},backend:n,attrs:{dim:o}});return i.push(t),t}),backend:n,attrs:{axis:o}});return i.forEach(e=>n.disposeIntermediateTensorInfo(e)),u}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class od{constructor(e,t,n){this.variableNames=["x"],this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Oo(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r);this.userCode=1!==r?`\n      ${o} start = ${o}(${a});\n      ${o} end = ${o}(${s});\n      uniform float value;\n\n      void main() {\n        ${o} outC = getOutputCoords();\n        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {\n          setOutput(value);\n        } else {\n          ${o} coords = outC - start;\n          setOutput(getX(${i}));\n        }\n      }\n    `:`\n        int start = ${a};\n        int end = ${s};\n        uniform float value;\n\n        void main() {\n          int outC = getOutputCoords();\n          if (outC < start || outC >= end) {\n            setOutput(value);\n          } else {\n            setOutput(getX(outC - start));\n          }\n        }\n      `}getCustomSetupFunc(e){return(t,n)=>{null==this.valueLoc&&(this.valueLoc=t.getUniformLocationNoThrow(n,"value")),t.gl.uniform1f(this.valueLoc,e)}}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ad{constructor(e,t,n){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((t,n)=>t[0]+e[n]+t[1]);const r=e.length,o=Oo(r),a=t.map(e=>e[0]).join(","),s=t.map((t,n)=>t[0]+e[n]).join(","),i=ns("rc",r),u=ns("source",r),c=`${i[r-1]} < ${this.outputShape[r-1]}`,l=1===r?"source":`vec2(${u.slice(-2).join()})`,d=[o+" rc = outputLoc;",`${i[r-1]} += 1;\n       if(${c}) {\n      `,1===r?"":`}\n       rc = outputLoc;\n       ${i[r-2]} += 1;\n       if(${i[r-2]} < ${this.outputShape[r-2]}) {`,1===r?"":`  ${i[r-1]} += 1;\n         if(${c}) {`],h=1===r?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))";let p="";for(let e=0,t=1===r?2:4;e<t;e++)p+=`\n        ${d[e]}\n        if (${h}) {\n          result[${e}] = float(value);\n        } else {\n          ${o} source = rc - start;\n          result[${e}] = getChannel(getX(${u.join()}), ${l});\n        }\n      `;p+=1===r?"} ":"}}",this.userCode=`\n      const ${o} start = ${o}(${a});\n      const ${o} end = ${o}(${s});\n      uniform float value;\n\n      void main() {\n        ${o} outputLoc = getOutputCoords();\n        vec4 result = vec4(0.);\n        ${p}\n        setOutput(result);\n      }\n    `}getCustomSetupFunc(e){return(t,n)=>{null==this.valueLoc&&(this.valueLoc=t.getUniformLocationNoThrow(n,"value")),t.gl.uniform1f(this.valueLoc,e)}}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const sd=e=>{const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{paddings:a,constantValue:s}=r,i=Object(c.b)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new ad(o.shape,a,s):new od(o.shape,a,s),u=i.getCustomSetupFunc(s);return n.runWebGLProgram(i,[o],o.dtype,u)},id={kernelName:F.ac,backendName:"webgl",kernelFunc:sd},ud=Ts({opSnippet:"\n  if(a < 0.0 && floor(b) < b){\n    return NAN;\n  }\n  if (b == 0.0) {\n    return 1.0;\n  }\n  return (round(mod(b, 2.0)) != 1) ?\n      pow(abs(a), b) : sign(a) * pow(abs(a), b);\n",packedOpSnippet:"\n  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.\n  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));\n  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);\n  vec4 result = multiplier * pow(abs(a), b);\n\n  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS\n  bvec4 isExpZero = equal(b, vec4(0.0));\n  result.r = isExpZero.r ? 1.0 : result.r;\n  result.g = isExpZero.g ? 1.0 : result.g;\n  result.b = isExpZero.b ? 1.0 : result.b;\n  result.a = isExpZero.a ? 1.0 : result.a;\n\n  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n"}),cd={kernelName:F.bc,backendName:"webgl",kernelFunc:ud};const ld={kernelName:F.dc,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{axis:s,keepDims:i}=r,u=o.shape.length,c=[],l=ce.parseAxisParam(s,o.shape);let d=l;const h=a.getAxesPermutation(d,u);let p,f=o;if(null!=h&&(f=qs({inputs:{x:o},backend:n,attrs:{perm:h}}),d=a.getInnerMostAxes(d.length,u),c.push(f)),a.assertAxesAreInnerMostDims("prod",d,u),n.shouldExecuteOnCPU([f])){const e=n.texData.get(f.dataId).values,{outVals:t,outShape:r,outDtype:o}=Wa(f.shape,f.dtype,e,d);p=n.makeTensorInfo(r,o,t)}else{const[e,t]=a.computeOutAndReduceShapes(f.shape,d),r=ce.sizeFromShape(t),s=Ms({inputs:{x:f},backend:n,attrs:{shape:[-1,r]}}),i=Vs(s,Object(le.a)(o.dtype),"prod",n);p=Ms({inputs:{x:i},backend:n,attrs:{shape:e}}),c.push(s),c.push(i)}if(i){c.push(p);const e=a.expandShapeToKeepDim(p.shape,l);p=Ms({inputs:{x:p},backend:n,attrs:{shape:e}})}return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),p}},dd=e=>{const{backend:t,attrs:n}=e,{start:r,stop:o,step:a,dtype:s}=n,i=Va(r,o,a,s);return t.makeTensorInfo([i.length],s,i)},hd={kernelName:F.ec,backendName:"webgl",kernelFunc:dd},pd=Ss({opSnippet:"return 1.0 / x;"}),fd={kernelName:F.hc,backendName:"webgl",kernelFunc:pd},gd=Ss({opSnippet:"if (isnan(x)) return x;\n  return (x < 0.0) ? 0.0 : x;\n",packedOpSnippet:"\n  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n"}),md={kernelName:F.ic,backendName:"webgl",kernelFunc:gd},bd=Ss({opSnippet:"if (isnan(x)) return x;\n  return (x < 0.0) ? 0.0 : min(6.0, x);\n",packedOpSnippet:"\n  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n"}),xd={kernelName:F.jc,backendName:"webgl",kernelFunc:bd};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class yd{constructor(e,t,n,r,o){this.variableNames=["A"],this.outputShape=[];const[a,s,i,u]=e;this.outputShape=[a,t,n,u];const c=[r&&t>1?s-1:s,r&&n>1?i-1:i],l=[r&&t>1?t-1:t,r&&n>1?n-1:n];let d;d=o?"(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":"vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          ${c[0]/l[0]},\n          ${c[1]/l[1]});\n      const vec2 inputShapeRC = vec2(${s}.0, ${i}.0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = ${d};\n\n        // Compute the four integer indices.\n        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));\n        ivec2 sourceCeilRC = ivec2(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);\n        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);\n        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);\n        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);\n\n        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);\n\n        float top = topLeft + (topRight - topLeft) * fracRC.y;\n        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;\n        float newValue = top + (bottom - top) * fracRC.x;\n\n        setOutput(newValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class vd{constructor(e,t,n,r,o){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];const[a,s,i,u]=e;this.outputShape=[a,t,n,u];const c=[r&&t>1?s-1:s,r&&n>1?i-1:i],l=[r&&t>1?t-1:t,r&&n>1?n-1:n];let d;d=o?"(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":"vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`\n      const vec3 effectiveInputOverOutputRatioRC = vec3(\n          ${c[0]/l[0]},\n          ${c[1]/l[1]},\n          ${c[1]/l[1]});\n      const vec3 inputShapeRC = vec3(${s}.0, ${i}.0,\n                                     ${i}.0);\n\n      float getAValue(int b, int r, int c, int d) {\n        return getChannel(getA(b, r, c, d), vec2(c, d));\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        // Calculate values for next column in yRC.z.\n        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);\n\n        // Fractional source index.\n        vec3 sourceFracIndexRC = ${d};\n\n        // Compute the four integer indices.\n        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));\n        ivec3 sourceCeilRC = ivec3(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        // Should we calculate next column and row elements in 2x2 packed cell.\n        bool hasNextCol = d < ${u-1};\n        bool hasNextRow = coords.z < ${n-1};\n\n        // In parallel, construct four corners for all four components in\n        // packed 2x2 cell.\n        vec4 topLeft = vec4(\n          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),\n          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);\n\n        vec4 bottomLeft = vec4(\n          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),\n          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);\n\n        vec4 topRight = vec4(\n          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),\n          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);\n\n        vec4 bottomRight = vec4(\n          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),\n          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);\n\n        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);\n\n        vec4 top = mix(topLeft, topRight, fracRC.yyzz);\n        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);\n        vec4 newValue = mix(top, bottom, fracRC.x);\n\n        setOutput(newValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wd={kernelName:F.lc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{images:o}=t,{alignCorners:a,halfPixelCenters:s,size:i}=r,[u,l]=i,d=Object(c.b)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new vd(o.shape,u,l,a,s):new yd(o.shape,u,l,a,s);return n.runWebGLProgram(d,[o],"float32")}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Cd{constructor(e,t,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;const[,r,o]=t,[,a,s]=e,i=[n&&a>1?r-1:r,n&&s>1?o-1:o],u=[n&&a>1?a-1:a,n&&s>1?s-1:s],c=i[0]/u[0],l=i[1]/u[1],d=1/c,h=1/l,p=2*Math.ceil(d)+2,f=2*Math.ceil(h)+2;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float(${c});\n        const float widthScale = float(${l});\n\n        const float invHeightScale = float(${d});\n        const float invWidthScale = float(${h});\n\n        const int winHeight = int(${p});\n        const int winWidth = int(${f});\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(startRLerp - float(winHeight / 2));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(startCLerp - float(winWidth / 2));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= ${a}) {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= ${s}) {\n              continue;\n            }\n\n            float dxR = float(dyR) * heightScale;\n            int topDxRIndex = int(floor(dxR));\n            int bottomDxRIndex = int(min(ceil(dxR), ${r-1}.0));\n            float dxRLerp = dxR - float(topDxRIndex);\n            float inverseDxRLerp = 1.0 - dxRLerp;\n\n            float dxC = float(dyC) * widthScale;\n            int leftDxCIndex = int(floor(dxC));\n            int rightDxCIndex = int(min(ceil(dxC), ${o-1}.0));\n            float dxCLerp = dxC - float(leftDxCIndex);\n            float inverseDxCLerp = 1.0 - dxCLerp;\n\n            if (r == topDxRIndex && c == leftDxCIndex) {\n              // topLeft\n              accumulator +=\n                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;\n            }\n\n            if (r == topDxRIndex && c == rightDxCIndex) {\n              // topRight\n              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == leftDxCIndex) {\n              // bottomLeft\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == rightDxCIndex) {\n              // bottomRight\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $d={kernelName:F.mc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{images:o,dy:a}=t,{alignCorners:s}=r,i=new Cd(a.shape,o.shape,s);return n.runWebGLProgram(i,[a],a.dtype)}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Id{constructor(e,t,n,r,o){this.variableNames=["A"],this.outputShape=[];const[a,s,i,u]=e;this.outputShape=[a,t,n,u];const c=[r&&t>1?s-1:s,r&&n>1?i-1:i],l=[r&&t>1?t-1:t,r&&n>1?n-1:n],d=r?"0.5":"0.0";let h;h=o?"max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":"vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          ${c[0]/l[0]},\n          ${c[1]/l[1]});\n      const vec2 inputShapeRC = vec2(${s}.0, ${i}.0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = ${h};\n\n        // Compute the coordinators of nearest neighbor point.\n        ivec2 sourceNearestRC = ivec2(\n          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));\n        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);\n\n        setOutput(newValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class kd{constructor(e,t,n,r,o){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];const[a,s,i,u]=e;this.outputShape=[a,t,n,u];const c=[r&&t>1?s-1:s,r&&n>1?i-1:i],l=[r&&t>1?t-1:t,r&&n>1?n-1:n],d=r?"0.5":"0.0";let h;h=o?"max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":"vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`\n      const vec3 effectiveInputOverOutputRatioRC = vec3(\n          ${c[0]/l[0]},\n          ${c[1]/l[1]},\n          ${c[1]/l[1]});\n      const vec3 inputShapeRC = vec3(${s}.0, ${i}.0,\n                                     ${i}.0);\n\n      float getAValue(int b, int r, int c, int d) {\n        return getChannel(getA(b, r, c, d), vec2(c, d));\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        // Calculate values for next column in yRC.z.\n        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);\n\n        // Fractional source index.\n        vec3 sourceFracIndexRC = ${h};\n\n        // Compute the coordinators of nearest neighbor point.\n        ivec3 sourceNearestRC = ivec3(\n          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));\n\n        // Should we calculate next column and row elements in 2x2 packed cell.\n        bool hasNextCol = d < ${u-1};\n        bool hasNextRow = coords.z < ${n-1};\n\n        vec4 newValue = vec4(\n          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),\n          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);\n\n        setOutput(newValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ed={kernelName:F.nc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{images:o}=t,{alignCorners:a,halfPixelCenters:s,size:i}=r,[u,l]=i,d=Object(c.b)().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new kd(o.shape,u,l,a,s):new Id(o.shape,u,l,a,s);return n.runWebGLProgram(d,[o],o.dtype)}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Rd{constructor(e,t,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;const[,r,o]=t,[,a,s]=e,i=[n&&a>1?r-1:r,n&&s>1?o-1:o],u=[n&&a>1?a-1:a,n&&s>1?s-1:s],c=i[0]/u[0],l=i[1]/u[1],d=1/c,h=1/l,p=2*Math.ceil(d)+2,f=2*Math.ceil(h)+2;this.userCode=`\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float(${c});\n        const float widthScale = float(${l});\n\n        const float invHeightScale = float(${d});\n        const float invWidthScale = float(${h});\n\n        const int winHeight = int(${p});\n        const int winWidth = int(${f});\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(floor(startRLerp - float(winHeight / 2)));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(floor(startCLerp - float(winWidth / 2)));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= ${a}) {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= ${s}) {\n              continue;\n            }\n\n            float sourceFracRow =\n              float(${i[0]}) *\n                (float(dyR) / float(${u[0]}));\n\n            float sourceFracCol =\n                float(${i[1]}) *\n                  (float(dyC) / float(${u[1]}));\n\n            int sourceNearestRow = int(min(\n                float(int(${r}) - 1),\n                ${n} ? float(round(sourceFracRow)) :\n                                  float(floor(sourceFracRow))));\n\n            int sourceNearestCol = int(min(\n                float(int(${o}) - 1),\n                ${n} ? float(round(sourceFracCol)) :\n                                  float(floor(sourceFracCol))));\n\n            if (r == sourceNearestRow && c == sourceNearestCol) {\n              accumulator += getDy(b, dyR, dyC, d);\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Od={kernelName:F.oc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{images:o,dy:a}=t,{alignCorners:s}=r,i=new Rd(a.shape,o.shape,s);return n.runWebGLProgram(i,[a],a.dtype)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Sd{constructor(e,t){this.variableNames=["x"];const n=e.length;if(n>4)throw new Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);if(this.outputShape=e,1===n)return void(this.userCode=`\n        void main() {\n          int coord = getOutputCoords();\n          setOutput(getX(${e[0]} - coord - 1));\n        }\n      `);const r=e.map((n,r)=>(n=>-1!==t.indexOf(n)&&1!==e[n]?`${e[n]} - coords[${n}] - 1`:`coords[${n}]`)(r)).join(","),o=Oo(n);this.userCode=`\n      void main() {\n        ${o} coords = getOutputCoords();\n        setOutput(getX(${r}));\n      }\n    `}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Td{constructor(e,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;const n=e.length;if(n>4)throw new Error(`WebGL backend: Reverse of rank-${n} tensor is not yet supported`);this.outputShape=e;const r=ns("rc",n),o=`${r[n-1]} + 1 < ${this.outputShape[n-1]}`,a=`${r[n-2]} + 1 < ${this.outputShape[n-2]}`,s=Oo(n);function i(n){const r=e.map((r,o)=>function(n,r){return-1!==t.indexOf(n)&&1!==e[n]?`${e[n]} - ${r[n]} - 1`:""+r[n]}(o,n));return`getChannel(getX(${r.join(",")}), vec2(${r.slice(-2).join(",")}))`}this.userCode=1===n?`\n        void main(){\n          int rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = getChannel(getX(${e[0]} - rc - 1),\n            ${e[0]} - rc - 1);\n          if(${o}){\n              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),\n                ${e[0]} - (rc  + 1) - 1);\n          }\n          setOutput(result);\n        }\n      `:`\n        void main() {\n          ${s} rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = ${function(e){return i(e)}(r.slice())};\n          if(${o}){\n            result.g = ${function(e){return e[n-1]="("+e[n-1]+" + 1)",i(e)}(r.slice())};\n          }\n          if(${a}) {\n            result.b = ${function(e){return e[n-2]="("+e[n-2]+" + 1)",i(e)}(r.slice())};\n            if(${o}) {\n              result.a = ${function(e){return e[n-1]="("+e[n-1]+" + 1)",e[n-2]="("+e[n-2]+" + 1)",i(e)}(r.slice())};\n            }\n          }\n          setOutput(result);\n        }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ad={kernelName:F.pc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{dims:a}=r,s=o.shape.length,i=ce.parseAxisParam(a,o.shape);if(0===s)return ys({inputs:{x:o},backend:n});const u=Object(c.b)().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Td(o.shape,i):new Sd(o.shape,i);return n.runWebGLProgram(u,[o],o.dtype)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Nd{constructor(e,t){this.variableNames=["Image"],this.outputShape=[];const n=e[1],r=e[2];this.outputShape=e;let o="";o="number"==typeof t?`float outputValue = ${t.toFixed(2)};`:`\n        vec3 fill = vec3(${t.join(",")});\n        float outputValue = fill[coords[3]];`,this.userCode=`\n        uniform vec4 params;\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int x = coords[2];\n          int y = coords[1];\n          float coordXFloat = (float(x) - params[0]) * params[3] -\n            (float(y) - params[1]) * params[2];\n          float coordYFloat = (float(x) - params[0]) * params[2] +\n            (float(y) - params[1]) * params[3];\n          int coordX = int(round(coordXFloat + params[0]));\n          int coordY = int(round(coordYFloat + params[1]));\n          ${o}\n          if(coordX >= 0 && coordX < ${r} && coordY >= 0 && coordY < ${n}) {\n            outputValue = getImage(coords[0], coordY, coordX, coords[3]);\n          }\n          setOutput(outputValue);\n        }\n    `}getCustomSetupFunc(e,t,n,r){return(o,a)=>{null==this.paramsLoc&&(this.paramsLoc=o.getUniformLocationNoThrow(a,"params")),o.gl.uniform4f(this.paramsLoc,e,t,n,r)}}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fd={kernelName:F.qc,backendName:"webgl",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{image:r}=e,{radians:o,fillValue:s,center:i}=t,u=n,c=new Nd(r.shape,s),[l,d]=a.getImageCenter(i,r.shape[1],r.shape[2]),h=c.getCustomSetupFunc(l,d,Math.sin(o),Math.cos(o));return u.runWebGLProgram(c,[r],r.dtype,h)}},_d=Ss({opSnippet:"\n  // OpenGL ES does not support round function.\n  // The algorithm is based on banker's rounding.\n  float base = floor(x);\n  if ((x - base) < 0.5) {\n    return floor(x);\n  } else if ((x - base) > 0.5) {\n    return ceil(x);\n  } else {\n    if (mod(base, 2.0) == 0.0) {\n      return base;\n    } else {\n      return base + 1.0;\n    }\n  }\n"}),Dd={kernelName:F.rc,backendName:"webgl",kernelFunc:_d},Ld=Ss({opSnippet:"return inversesqrt(x);",cpuKernelImpl:za}),Pd={kernelName:F.sc,backendName:"webgl",kernelFunc:Ld};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Bd{constructor(e,t,n,r,o,a,s=!0){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;const i=Oo(o.length),u=Oo(a.length);let c="";1===n?c="i":2===n&&(c="i, j");const l=`getIndices(${c})`;let d="";1===r?d="i":2===r&&(d="i, coords[1]");const h=`getUpdates(${d})`,p=t>1?"strides[j]":"strides";this.userCode=`\n        ${i} strides = ${i}(${o});\n\n        void main() {\n          ${u} coords = getOutputCoords();\n          float sum = 0.0;\n          bool found = false;\n          for (int i = 0; i < ${e}; i++) {\n            int flattenedIndex = 0;\n            for (int j = 0; j < ${t}; j++) {\n              int index = round(${l});\n              flattenedIndex += index * ${p};\n            }\n            if (flattenedIndex == coords[0]) {\n              sum += ${h};\n              found = true;\n            }\n          }\n          setOutput(mix(getDefaultValue(), sum, float(found)));\n        }\n      `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Md={kernelName:F.tc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{indices:o,updates:s}=t,{shape:i}=r,{sliceRank:u,numUpdates:c,sliceSize:l,strides:d,outputSize:h}=a.calculateShapes(s,o,i),p=[h/l,l];if(0===h)return n.makeTensorInfo(i,o.dtype);const f=Ms({inputs:{x:o},backend:n,attrs:{shape:[c,u]}}),g=Ms({inputs:{x:s},backend:n,attrs:{shape:[c,l]}}),m=n.makeTensorInfo([],"float32",new Float32Array([0])),b=new Bd(c,u,f.shape.length,g.shape.length,d,p),x=n.runWebGLProgram(b,[g,f,m],g.dtype),y=Ms({inputs:{x:x},backend:n,attrs:{shape:i}});return n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(x),n.disposeIntermediateTensorInfo(m),y}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class jd{constructor(e,t,n){let r,o;if(this.variableNames=["c","a","b"],this.outputShape=t,n>4)throw Error(`Where for rank ${n} is not yet supported`);if(1===n)o="resRC",r="resRC";else{const n=["resRC.x","resRC.y","resRC.z","resRC.w"],a=[],s=[];for(let r=0;r<t.length;r++)s.push(""+n[r]),r<e&&a.push(""+n[r]);r=a.join(),o=s.join()}const a=Oo(n);this.userCode=`\n      void main() {\n        ${a} resRC = getOutputCoords();\n        float cVal = getC(${r});\n        if (cVal >= 1.0) {\n          setOutput(getA(${o}));\n        } else {\n          setOutput(getB(${o}));\n        }\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ud={kernelName:F.uc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{condition:r,t:o,e:a}=t,s=new jd(r.shape.length,o.shape,o.shape.length);return n.runWebGLProgram(s,[r,o,a],Object(le.b)(o.dtype,a.dtype))}},Wd=Ss({opSnippet:`\n  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.\n  // see: https://arxiv.org/abs/1706.02515\n  float scaleAlpha = ${a.SELU_SCALEALPHA};\n  float scale = ${a.SELU_SCALE};\n  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);\n`}),Vd={kernelName:F.vc,backendName:"webgl",kernelFunc:Wd},zd=Ss({opSnippet:"return 1.0 / (1.0 + exp(-1.0 * x));"}),Gd={kernelName:F.wc,backendName:"webgl",kernelFunc:zd},Hd=Ss({opSnippet:"\n  if (isnan(x)) { return 0.0; }\n  return sign(x);\n"}),Xd={kernelName:F.xc,backendName:"webgl",kernelFunc:Hd},Kd=Ss({opSnippet:"if (isnan(x)) return x;\n  return sin(x);\n"}),qd={kernelName:F.yc,backendName:"webgl",kernelFunc:Kd},Yd=Ss({opSnippet:"\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n"}),Qd={kernelName:F.zc,backendName:"webgl",kernelFunc:Yd},Zd=Ss({opSnippet:"\n  float epsilon = 1.1920928955078125e-7;\n  float threshold = log(epsilon) + 2.0;\n\n  bool too_large = x > -threshold;\n  bool too_small = x < threshold;\n\n  float result;\n  float exp_x = exp(x);\n\n  if (too_large){\n    result = x;\n  }\n  else if (too_small){\n    result = exp_x;\n  }\n  else{\n    result = log(exp_x + 1.0);\n  }\n  return result;\n"}),Jd={kernelName:F.Cc,backendName:"webgl",kernelFunc:Zd},eh={kernelName:F.Dc,backendName:"webgl",kernelFunc:e=>{const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{blockShape:s,paddings:i}=r;ce.assert(o.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");const u=s.reduce((e,t)=>e*t),c=[[0,0]];c.push(...i);for(let e=1+s.length;e<o.shape.length;++e)c.push([0,0]);const l=[],d=sd({inputs:{x:o},backend:n,attrs:{paddings:c,constantValue:0}}),h=a.getReshaped(d.shape,s,u,!1),p=a.getPermuted(h.length,s.length,!1),f=a.getReshapedPermuted(d.shape,s,u,!1),g=Ms({inputs:{x:d},backend:n,attrs:{shape:h}}),m=qs({inputs:{x:g},backend:n,attrs:{perm:p}}),b=Ms({inputs:{x:m},backend:n,attrs:{shape:f}});return l.push(d),l.push(g),l.push(m),l.forEach(e=>n.disposeIntermediateTensorInfo(e)),b}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const th={kernelName:F.Ec,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){const{inputs:t,backend:n}=e,{indices:r,values:o,denseShape:a,defaultValue:s}=t;if(1!==a.shape.length)throw new Error("Dense shape must be a vector, saw:\n         "+a.shape);if(2!==r.shape.length)throw new Error("Indices must be a matrix, saw:\n         "+r.shape);if(1!==o.shape.length)throw new Error("Values must be a vector, saw:\n         "+o.shape);if(0!==s.shape.length)throw new Error("Default value must be a scalar, saw:\n        "+s.shape);const i=n.readSync(r.dataId),u=n.readSync(o.dataId),c=n.readSync(a.dataId),l=n.readSync(s.dataId)[0],[d,h,p,f,g]=Xa(i,r.shape,r.dtype,u,o.dtype,c,l);return[n.makeTensorInfo(h,r.dtype,d),n.makeTensorInfo([h[0]],o.dtype,p),n.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(e=>Number(e)))),n.makeTensorInfo([g.length],r.dtype,new Int32Array(g))]}};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nh={kernelName:F.Fc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n}=e,{inputIndices:r,inputShape:o,newShape:a}=t;if(2!==r.shape.length)throw new Error("Input indices should be a matrix but received shape "+r.shape);if(1!==o.shape.length)throw new Error("Input shape should be a vector but received shape "+o.shape);if(1!==a.shape.length)throw new Error("Target shape should be a vector but received shape "+a.shape);const s=Array.from(n.readSync(o.dataId)),i=n.readSync(r.dataId),u=Array.from(n.readSync(a.dataId)),[c,l,d]=Ka(i,r.shape,r.dtype,s,u);return[n.makeTensorInfo(l,r.dtype,c),n.makeTensorInfo([d.length],a.dtype,new Int32Array(d))]}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rh={kernelName:F.Gc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{sparseIndices:o,sparseValues:s,defaultValue:i}=t,{outputShape:u}=r,{sliceRank:c,numUpdates:l,strides:d,outputSize:h}=a.calculateShapes(s,o,u),p=new Bd(l,c,o.shape.length,s.shape.length,d,[h,1],!1),f=n.runWebGLProgram(p,[s,o,i],s.dtype),g=Ms({inputs:{x:f},backend:n,attrs:{shape:u}});return n.disposeIntermediateTensorInfo(f),g}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const oh={kernelName:F.Hc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{numOrSizeSplits:s,axis:i}=r,u=ce.parseAxisParam(i,o.shape)[0],c=a.prepareSplitSize(o,s,u),l=o.shape.length,d=new Array(l).fill(0),h=o.shape.slice();return c.map(e=>{const t=[...h];t[u]=e;const r=Wi({inputs:{x:o},backend:n,attrs:{begin:d,size:t}});return d[u]+=e,r})}},ah=Ss({opSnippet:"return sqrt(x);"}),sh={kernelName:F.Ic,backendName:"webgl",kernelFunc:ah},ih=Ss({opSnippet:"return x * x;"}),uh={kernelName:F.Jc,backendName:"webgl",kernelFunc:ih},ch=Ts({opSnippet:"return (a - b) * (a - b);",packedOpSnippet:"return (a - b) * (a - b);"}),lh={kernelName:F.Kc,backendName:"webgl",kernelFunc:ch};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dh={kernelName:F.Lc,backendName:"webgl",kernelFunc:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function({inputs:e,attrs:t,backend:n}){const{x:r}=e,o=`if (isnan(x)) return x;\n    return x > 0.0 ? 1.0 : float(${t.alpha});\n  `,a=new cs(r.shape,o);return n.runWebGLProgram(a,[r],r.dtype)}};
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class hh{constructor(e,t,n){this.variableNames=["x"],this.outputShape=n;const r=n.length,o=Oo(n.length),a=Oo(n.length);let s="";if(1===r)s="coords * strides + begin";else{let e=0;s=n.map((t,r)=>(e++,1===n.length?`coords * strides[${r}] + begin[${r}]`:`coords[${e-1}] * strides[${r}] + begin[${r}]`)).join(",")}this.userCode=`\n      ${o} begin = ${o}(${e});\n      ${o} strides = ${o}(${t});\n\n      void main() {\n        ${a} coords = getOutputCoords();\n        setOutput(getX(${s}));\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ph={kernelName:F.Mc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:o}=e,{x:a}=t,{begin:s,end:i,strides:u,beginMask:c,endMask:l,ellipsisMask:d,newAxisMask:h,shrinkAxisMask:p}=o,{nonStrided:f,$begin:g,$strides:m,size:b,newShape:x,outShape:y}=r.sliceInfo(a.shape,s,i,u,c,l,d,h,p),v=Ms({inputs:{x:a},backend:n,attrs:{shape:x}});let w;if(f){const e=Wi({inputs:{x:v},backend:n,attrs:{begin:g,size:b}});w=Ms({inputs:{x:e},backend:n,attrs:{shape:y}}),n.disposeIntermediateTensorInfo(e)}else if(y.some(e=>0===e))w=n.makeTensorInfo(y,a.dtype,[]);else{if(n.shouldExecuteOnCPU([v])){const e=n.texData.get(v.dataId).values,t=N(v.shape,v.dtype,e),r=qa(y,t,m,g);w=n.makeTensorInfo(y,v.dtype,r.values)}else{const e=new hh(g,m,y);w=n.runWebGLProgram(e,[v],v.dtype)}}const C=Ms({inputs:{x:w},backend:n,attrs:{shape:y}});return n.disposeIntermediateTensorInfo(v),n.disposeIntermediateTensorInfo(w),C}},fh=Ss({opSnippet:"return tan(x);"}),gh={kernelName:F.Pc,backendName:"webgl",kernelFunc:fh},mh=Ss({opSnippet:"\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n"}),bh={kernelName:F.Qc,backendName:"webgl",kernelFunc:mh};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class xh{constructor(e,t){this.variableNames=["A"];const n=new Array(e.length);for(let r=0;r<n.length;r++)n[r]=e[r]*t[r];this.outputShape=n,this.rank=n.length;const r=Oo(this.rank),o=function(e){const t=e.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(1===t)return`imod(resRC, ${e[0]})`;const n=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],r=[];for(let t=0;t<e.length;t++)r.push(`imod(${n[t]}, ${e[t]})`);return r.join()}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e);this.userCode=`\n      void main() {\n        ${r} resRC = getOutputCoords();\n        setOutput(getA(${o}));\n      }\n    `}}function yh(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{reps:a}=r;if("string"===o.dtype||o.shape.length>5){const e=n.readSync(o.dataId),t="string"===o.dtype?e.map(e=>ce.decodeString(e)):e,r=N(o.shape,o.dtype,t),s=Qa(r,a);return n.makeTensorInfo(s.shape,s.dtype,s.values)}const s=new xh(o.shape,a);return n.runWebGLProgram(s,[o],o.dtype)}const vh={kernelName:F.Rc,backendName:"webgl",kernelFunc:yh};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wh={kernelName:F.Sc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o}=t,{k:a,sorted:s}=r,i=n.readSync(o.dataId),[u,c]=Za(i,o.shape,o.dtype,a,s);return[n.makeTensorInfo(u.shape,u.dtype,u.values),n.makeTensorInfo(c.shape,c.dtype,c.values)]}};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ch{constructor(e,t,n,r,o,a){this.variableNames=["Image","Transforms"],this.outputShape=a;const s="nearest"===n?1:2;let i;switch(r){case"constant":i=1;break;case"reflect":i=2;break;case"wrap":i=3;break;case"nearest":i=4;break;default:i=1}this.userCode=`\n            float mapCoord(float outCoord, float len) {\n              float inCoord = outCoord;\n              if(${i} == 2) {\n                if (inCoord < 0.0) {\n                  if (len <= 1.0) {\n                    inCoord = 0.0;\n                  } else {\n                    float sz2 = 2.0 * len;\n                    if (inCoord < sz2) {\n                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +\n                      inCoord;\n                    }\n                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;\n                  }\n                } else if (inCoord > len - 1.0) {\n                  if (len <= 1.0) {\n                    inCoord = 0.0;\n                  } else {\n                    float sz2 = 2.0 * len;\n                    inCoord -= sz2 * float(int(float(inCoord / sz2)));\n                    if (inCoord >= len) {\n                      inCoord = sz2 - inCoord - 1.0;\n                    }\n                  }\n                }\n                return clamp(inCoord, 0.0, len - 1.0);\n              } else if (${i} == 3) {\n                if (inCoord < 0.0) {\n                  if (len <= 1.0) {\n                    inCoord = 0.0;\n                  } else {\n                    float sz = len - 1.0;\n                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);\n                  }\n                } else if (inCoord > len - 1.0) {\n                  if (len <= 1.0) {\n                    inCoord = 0.0;\n                  } else {\n                    float sz = len - 1.0;\n                    inCoord -= len * float(int(float(inCoord / sz)));\n                  }\n                }\n                return clamp(inCoord, 0.0, len - 1.0);\n              } else if (${i} == 4) {\n                return clamp(outCoord, 0.0, len - 1.0);\n              } else {\n                return outCoord;\n              }\n            }\n\n            float readWithFillValue(int batch, int coordY, int coordX,\n              int channel) {\n              float outputValue;\n              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {\n                  outputValue = getImage(batch, coordY, coordX, channel);\n              } else {\n                outputValue = float(${o});\n              }\n              return outputValue;\n            }\n\n            void main() {\n              ivec4 coords = getOutputCoords();\n              float outputValue;\n              int batch = coords[0];\n              int x = coords[2];\n              int y = coords[1];\n              int channel = coords[3];\n              float xf = float(x);\n              float yf = float(y);\n              float a1 = getTransforms(batch, 0);\n              float a2 = getTransforms(batch, 1);\n              float a3 = getTransforms(batch, 2);\n              float b1 = getTransforms(batch, 3);\n              float b2 = getTransforms(batch, 4);\n              float b3 = getTransforms(batch, 5);\n              float c1 = getTransforms(batch, 6);\n              float c2 = getTransforms(batch, 7);\n              float projection = c1 * xf + c2 * yf + 1.0;\n              if (projection == 0.0) {\n                outputValue = float(${o});\n              } else {\n                float inX = (a1 * xf + a2 * yf + a3) / projection;\n                float inY = (b1 * xf + b2 * yf + b3) / projection;\n                float mapX = mapCoord(inX, float(${t}));\n                float mapY = mapCoord(inY, float(${e}));\n\n                if (${s} == 1) {\n                  int coordY = int(round(mapY));\n                  int coordX = int(round(mapX));\n                  outputValue = readWithFillValue(batch, coordY, coordX,\n                    channel);\n                } else {\n                  float yFloor = floor(mapY);\n                  float xFloor = floor(mapX);\n                  float yCeil = yFloor + 1.0;\n                  float xCeil = xFloor + 1.0;\n                  float valueYFloor = (xCeil - mapX) *\n                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +\n                  (mapX - xFloor) *\n                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);\n                  float valueYCeil = (xCeil - mapX) *\n                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +\n                  (mapX - xFloor) *\n                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);\n                  outputValue = (yCeil - mapY) * valueYFloor +\n                  (mapY - yFloor) * valueYCeil;\n                }\n              }\n              setOutput(outputValue);\n            }\n        `}}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $h={kernelName:F.Tc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{image:o,transforms:a}=t,{interpolation:s,fillMode:i,fillValue:u,outputShape:c}=r,[l,d,h,p]=o.shape,[f,g]=null!=c?c:[d,h],m=new Ch(d,h,s,i,u,[l,f,g,p]);return n.runWebGLProgram(m,[o,a],"float32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ih={kernelName:F.Vc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,attrs:n,backend:r}=e,{axis:o}=n,{x:a}=t;Xr(a,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");const s=r.readSync(a.dataId),{outputValues:i,outputShape:u,indices:c}=es(s,o,a.shape,a.dtype);return[r.makeTensorInfo(u,a.dtype,i),r.makeTensorInfo([c.length],"int32",c)]}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kh={kernelName:F.Wc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{value:o}=t;let{axis:a}=r;a<0&&(a+=o.shape.length);const s=o,i=s.shape.length,u=o.shape[a],c=new Array(i-1);let l=0;for(let e=0;e<i;e++)e!==a&&(c[l++]=s.shape[e]);const d=[],h=new Array(i).fill(0),p=s.shape.slice();p[a]=1;const f=new Array(u);for(let e=0;e<f.length;e++){h[a]=e;const t=Wi({inputs:{x:s},backend:n,attrs:{begin:h,size:p}}),r=Ms({inputs:{x:t},backend:n,attrs:{shape:c}});f[e]=r,d.push(t)}return d.forEach(e=>n.disposeIntermediateTensorInfo(e)),f}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Eh{constructor(e,t){this.variableNames=["x","segmentIds"];const n=e.windowSize,r=e.batchSize,o=e.inSize,a=e.numSegments,s=a*Math.ceil(o/n);this.outputShape=[r,s];const i=4*Math.floor(n/4),u=n%4,c="\n        sumValue += dot(values, segFilter);\n    ";let l="";o%n>0&&(l=`\n        if (inIdx < 0 || inIdx >= ${o}) {\n          return initializationValue;\n        }\n      `);let d="";o%n>0&&(d=`\n        if (inIdx < 0 || inIdx >= ${o}) {\n          return -1.0;\n        }\n      `),this.userCode=`\n      const float initializationValue = 0.0;\n\n      float getValue(int batch, int inIdx) {\n        ${l}\n        return getX(batch, inIdx);\n      }\n\n      float getSegmentIdAtIndex(int inIdx) {\n        ${d}\n        return getSegmentIds(inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = int(floor(float(outIdx) / float(\n          ${a})) * float(${n}));\n        int currentSeg = int(mod(float(outIdx), float(${a})));\n\n        float sumValue = 0.0;\n\n        for (int i = 0; i < ${i}; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0\n          );\n\n          ${c}\n        }\n\n        int inIdx = inOffset + ${i};\n        if (${1===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            0,\n            0,\n            0\n          );\n\n          ${c}\n        } else if (${2===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n              0,\n              0\n          );\n\n          ${c}\n        } else if (${3===u}) {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            0\n          );\n\n          ${c}\n        }\n        setOutput(sumValue);\n      }\n    `}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rh=[hl,fl,Zs,Js,ti,ri,si,ci,li,di,gi,mi,xi,vi,Ii,Ci,Ei,Ti,Si,Fi,_i,Di,Bi,zi,Gi,Yi,Ji,nu,au,Cs,pu,Iu,ku,yu,Ru,Ou,Eu,Tu,Nu,_u,Bu,Mu,Uu,Xu,Ku,zu,Yu,Zu,Ju,tc,nc,oc,sc,cc,dc,fc,bc,vc,Cc,kc,Rc,Tc,Nc,Fc,Dc,Pc,Mc,Uc,vs,Wc,lu,zc,Hc,Kc,ks,Yc,Zc,Jc,rl,tl,al,il,cl,ml,vl,yl,$l,Il,kl,xl,El,Rl,Sl,Nl,_l,Vl,Bs,Gl,Xl,ql,Ql,Xi,Jl,nd,rd,id,cd,Os,ld,hd,qi,Pl,fd,xd,md,js,wd,$d,Ed,Od,Ad,Fd,Dd,Pd,Md,Ud,Vd,Gd,Xd,qd,Qd,Vi,Wl,Jd,eh,th,nh,rh,oh,sh,uh,lh,dh,ph,jl,Ks,gh,bh,vh,wh,$h,Ys,Ih,kh,{kernelName:F.Xc,backendName:"webgl",kernelFunc:function(e){const{inputs:t,backend:n,attrs:r}=e,{x:o,segmentIds:s}=t,{numSegments:i}=r,u=o.shape.length,c=[];let l=0;const d=a.getAxesPermutation([l],u);let h=o;null!=d&&(h=qs({inputs:{x:o},backend:n,attrs:{perm:d}}),c.push(h),l=a.getInnerMostAxes(1,u)[0]);const p=a.segment_util.computeOutShape(h.shape,l,i),f=ce.sizeFromShape([h.shape[l]]),g=Ms({inputs:{x:h},backend:n,attrs:{shape:[-1,f]}});c.push(g);const m=Object(le.a)(o.dtype),b=(e,t,r,o,s)=>{const i=e.shape[0],u=e.shape[1],l=a.segment_util.segOpComputeOptimalWindowSize(u,s),d=new Eh({windowSize:l,inSize:u,batchSize:i,numSegments:s},t),h=n.compileAndRun(d,[e,r],o);if(c.push(h),h.shape[1]===s)return h;const p=dd({backend:n,attrs:{start:0,stop:s,step:1,dtype:"float32"}}),f=yh({inputs:{x:p},backend:n,attrs:{reps:[u/l]}});c.push(p),c.push(f);return b(h,t,f,o,s)},x=Ms({inputs:{x:b(g,"unsortedSegmentSum",s,m,i)},backend:n,attrs:{shape:p}});let y=x;if(null!=d){c.push(x);const e=a.getUndoAxesPermutation(d);y=qs({inputs:{x:y},backend:n,attrs:{perm:e}})}return c.forEach(e=>n.disposeIntermediateTensorInfo(e)),y}},td];
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */for(const e of Rh)Object(Kt.d)(e);
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Oh(e,t){const n=Ee.a(e.map(e=>[e.position.x,e.position.y,e.score]));let r;r="all"===t?[0,1,2,3,4,5,6,7,8,9]:t;const o=[5,6,7,8,11,12,13,14,5,6],a=[[7,5,6],[8,6,5],[5,7,9],[6,8,10],[13,11,5],[14,12,6],[11,13,15],[12,14,16],[9,5,13],[10,6,14]],s=[],i=[];for(let t=0;t<r.length;t++){s.push(a[r[t]]);const n=e[o[r[t]]],{x:u,y:c}=n.position,l=a[r[t]],d=e[l[0]],h=e[l[2]],p=d.score,f=n.score,g=h.score,m=Math.sqrt(p*p+f*f*(g*g)/3);i.push([u,c,m])}let u=s.map(e=>{const t=Re(e,"int32");return Ce(me(n,t),[0,0],[-1,2])});u=ye(he(u,0),[-1,3,2]);const c=ye(Ie(Ce(u,[0,0,0],[-1,1,-1]),Ce(u,[0,1,0],[-1,1,-1])),[-1,2]),l=ye(Ie(Ce(u,[0,2,0],[-1,1,-1]),Ce(u,[0,1,0],[-1,1,-1])),[-1,2]),d=be($e(ke(xe(c,2),1)),$e(ke(xe(l,2),1)));return{info:i,angles:be(de(ge(ke(be(c,l),1),d)),180/Math.PI).arraySync()}}console.log("this is message from angles worker."),addEventListener("message",(function(e){var n,r=e.data,o=r.type,a=r.method,s=r.id,i=r.params;"RPC"===o&&a&&((n=t[a])?Promise.resolve().then((function(){return n.apply(t,i)})):Promise.reject("No such method")).then((function(e){postMessage({type:"RPC",id:s,result:e})})).catch((function(e){var t={message:e};e.stack&&(t.message=e.message,t.stack=e.stack,t.name=e.name),postMessage({type:"RPC",id:s,error:t})}))})),postMessage({type:"RPC",method:"ready"})},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));class r{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}}class o{refCount(e){return a("refCount")}incRef(e){return a("incRef")}timerAvailable(){return!0}time(e){return a("time")}read(e){return a("read")}readSync(e){return a("readSync")}numDataIds(){return a("numDataIds")}disposeData(e,t){return a("disposeData")}write(e,t,n){return a("write")}move(e,t,n,r,o){return a("move")}memory(){return a("memory")}floatPrecision(){return a("floatPrecision")}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}dispose(){return a("dispose")}}function a(e){throw new Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}},18:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const r={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8}},19:function(e,t,n){"use strict";function r(e){if(e||"undefined"!=typeof navigator&&null!=navigator){if(e||(e=navigator),"ReactNative"===e.product)return!0;const t=e.userAgent||e.vendor||window.opera;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function o(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}n.r(t),n.d(t,"isMobile",(function(){return r})),n.d(t,"isBrowser",(function(){return o}))},2:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(1),o=n(6);function a(e){const t=Object.keys(e);if(1!==t.length)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+t.length+" keys.");let n=t[0];const a=e[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n+="__op";const s=(...e)=>{r.a.startScope(n);try{const t=a(...e);return Object(o.x)(t)&&console.error("Cannot return a Promise inside of tidy."),r.a.endScope(t),t}catch(e){throw r.a.endScope(null),e}};return Object.defineProperty(s,"name",{value:n,configurable:!0}),s}},20:function(e,t){var n,r,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function i(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var u,c=[],l=!1,d=-1;function h(){l&&u&&(l=!1,u.length?c=u.concat(c):d=-1,c.length&&p())}function p(){if(!l){var e=i(h);l=!0;for(var t=c.length;t;){for(u=c,c=[];++d<t;)u&&u[d].run();d=-1,t=c.length}u=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new f(e,t)),1!==c.length||l||i(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},21:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},3:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return s})),n.d(t,"e",(function(){return i})),n.d(t,"f",(function(){return u})),n.d(t,"g",(function(){return c})),n.d(t,"h",(function(){return l})),n.d(t,"i",(function(){return d})),n.d(t,"j",(function(){return h})),n.d(t,"k",(function(){return p})),n.d(t,"l",(function(){return f})),n.d(t,"n",(function(){return g})),n.d(t,"m",(function(){return m})),n.d(t,"o",(function(){return b})),n.d(t,"r",(function(){return x})),n.d(t,"p",(function(){return y})),n.d(t,"q",(function(){return v})),n.d(t,"s",(function(){return w})),n.d(t,"t",(function(){return C})),n.d(t,"u",(function(){return $})),n.d(t,"v",(function(){return I})),n.d(t,"w",(function(){return k})),n.d(t,"x",(function(){return E})),n.d(t,"y",(function(){return R})),n.d(t,"z",(function(){return O})),n.d(t,"A",(function(){return S})),n.d(t,"B",(function(){return T})),n.d(t,"C",(function(){return A})),n.d(t,"D",(function(){return N})),n.d(t,"E",(function(){return F})),n.d(t,"F",(function(){return _})),n.d(t,"G",(function(){return D})),n.d(t,"H",(function(){return L})),n.d(t,"I",(function(){return P})),n.d(t,"K",(function(){return B})),n.d(t,"J",(function(){return M})),n.d(t,"L",(function(){return j})),n.d(t,"M",(function(){return U})),n.d(t,"N",(function(){return W})),n.d(t,"O",(function(){return V})),n.d(t,"P",(function(){return z})),n.d(t,"Q",(function(){return G})),n.d(t,"R",(function(){return H})),n.d(t,"gc",(function(){return X})),n.d(t,"S",(function(){return K})),n.d(t,"T",(function(){return q})),n.d(t,"U",(function(){return Y})),n.d(t,"W",(function(){return Q})),n.d(t,"V",(function(){return Z})),n.d(t,"X",(function(){return J})),n.d(t,"Y",(function(){return ee})),n.d(t,"Z",(function(){return te})),n.d(t,"ab",(function(){return ne})),n.d(t,"bb",(function(){return re})),n.d(t,"cb",(function(){return oe})),n.d(t,"db",(function(){return ae})),n.d(t,"eb",(function(){return se})),n.d(t,"gb",(function(){return ie})),n.d(t,"kb",(function(){return ue})),n.d(t,"jb",(function(){return ce})),n.d(t,"lb",(function(){return le})),n.d(t,"mb",(function(){return de})),n.d(t,"ob",(function(){return he})),n.d(t,"nb",(function(){return pe})),n.d(t,"pb",(function(){return fe})),n.d(t,"qb",(function(){return ge})),n.d(t,"rb",(function(){return me})),n.d(t,"sb",(function(){return be})),n.d(t,"vb",(function(){return xe})),n.d(t,"wb",(function(){return ye})),n.d(t,"xb",(function(){return ve})),n.d(t,"yb",(function(){return we})),n.d(t,"zb",(function(){return Ce})),n.d(t,"Ab",(function(){return $e})),n.d(t,"Bb",(function(){return Ie})),n.d(t,"Cb",(function(){return ke})),n.d(t,"Db",(function(){return Ee})),n.d(t,"tb",(function(){return Re})),n.d(t,"ub",(function(){return Oe})),n.d(t,"Eb",(function(){return Se})),n.d(t,"Kb",(function(){return Te})),n.d(t,"Fb",(function(){return Ae})),n.d(t,"Ib",(function(){return Ne})),n.d(t,"Gb",(function(){return Fe})),n.d(t,"Hb",(function(){return _e})),n.d(t,"Jb",(function(){return De})),n.d(t,"Lb",(function(){return Le})),n.d(t,"Mb",(function(){return Pe})),n.d(t,"Nb",(function(){return Be})),n.d(t,"Ob",(function(){return Me})),n.d(t,"Pb",(function(){return je})),n.d(t,"Qb",(function(){return Ue})),n.d(t,"Rb",(function(){return We})),n.d(t,"Sb",(function(){return Ve})),n.d(t,"Wb",(function(){return ze})),n.d(t,"Tb",(function(){return Ge})),n.d(t,"Ub",(function(){return He})),n.d(t,"Vb",(function(){return Xe})),n.d(t,"Yb",(function(){return Ke})),n.d(t,"Xb",(function(){return qe})),n.d(t,"Zb",(function(){return Ye})),n.d(t,"ac",(function(){return Qe})),n.d(t,"bc",(function(){return Ze})),n.d(t,"cc",(function(){return Je})),n.d(t,"dc",(function(){return et})),n.d(t,"ec",(function(){return tt})),n.d(t,"fc",(function(){return nt})),n.d(t,"hc",(function(){return rt})),n.d(t,"ic",(function(){return ot})),n.d(t,"kc",(function(){return at})),n.d(t,"nc",(function(){return st})),n.d(t,"oc",(function(){return it})),n.d(t,"lc",(function(){return ut})),n.d(t,"mc",(function(){return ct})),n.d(t,"jc",(function(){return lt})),n.d(t,"pc",(function(){return dt})),n.d(t,"rc",(function(){return ht})),n.d(t,"sc",(function(){return pt})),n.d(t,"tc",(function(){return ft})),n.d(t,"uc",(function(){return gt})),n.d(t,"vc",(function(){return mt})),n.d(t,"Ac",(function(){return bt})),n.d(t,"yc",(function(){return xt})),n.d(t,"zc",(function(){return yt})),n.d(t,"xc",(function(){return vt})),n.d(t,"wc",(function(){return wt})),n.d(t,"Cc",(function(){return Ct})),n.d(t,"Ic",(function(){return $t})),n.d(t,"Oc",(function(){return It})),n.d(t,"Dc",(function(){return kt})),n.d(t,"Hc",(function(){return Et})),n.d(t,"Bc",(function(){return Rt})),n.d(t,"Ec",(function(){return Ot})),n.d(t,"Fc",(function(){return St})),n.d(t,"Gc",(function(){return Tt})),n.d(t,"Kc",(function(){return At})),n.d(t,"Jc",(function(){return Nt})),n.d(t,"Mc",(function(){return Ft})),n.d(t,"Nc",(function(){return _t})),n.d(t,"Pc",(function(){return Dt})),n.d(t,"Qc",(function(){return Lt})),n.d(t,"Rc",(function(){return Pt})),n.d(t,"Sc",(function(){return Bt})),n.d(t,"Tc",(function(){return Mt})),n.d(t,"Uc",(function(){return jt})),n.d(t,"Vc",(function(){return Ut})),n.d(t,"Wc",(function(){return Wt})),n.d(t,"Xc",(function(){return Vt})),n.d(t,"Yc",(function(){return zt})),n.d(t,"Lc",(function(){return Gt})),n.d(t,"fb",(function(){return Ht})),n.d(t,"qc",(function(){return Xt})),n.d(t,"Zc",(function(){return Kt})),n.d(t,"hb",(function(){return qt})),n.d(t,"ib",(function(){return Yt}));const r="Abs",o="Acos",a="Acosh",s="Add",i="AddN",u="All",c="Any",l="ArgMax",d="ArgMin",h="Asin",p="Asinh",f="Atan",g="Atanh",m="Atan2",b="AvgPool",x="AvgPoolGrad",y="AvgPool3D",v="AvgPool3DGrad",w="BatchMatMul",C="BatchToSpaceND",$="Bincount",I="Cast",k="Ceil",E="ClipByValue",R="Complex",O="ComplexAbs",S="Concat",T="Conv2D",A="Conv2DBackpropFilter",N="Conv2DBackpropInput",F="Conv3D",_="Conv3DBackpropFilterV2",D="Conv3DBackpropInputV2",L="Cos",P="Cosh",B="Cumsum",M="CropAndResize",j="DenseBincount",U="DepthToSpace",W="DepthwiseConv2dNative",V="DepthwiseConv2dNativeBackpropFilter",z="DepthwiseConv2dNativeBackpropInput",G="Diag",H="Dilation2D",X="RealDiv",K="Einsum",q="Elu",Y="EluGrad",Q="Erf",Z="Equal",J="Exp",ee="ExpandDims",te="Expm1",ne="FFT",re="Fill",oe="FlipLeftRight",ae="Floor",se="FloorDiv",ie="FusedBatchNorm",ue="GatherV2",ce="GatherNd",le="Greater",de="GreaterEqual",he="Identity",pe="IFFT",fe="Imag",ge="IsFinite",me="IsInf",be="IsNan",xe="LeakyRelu",ye="Less",ve="LessEqual",we="LinSpace",Ce="Log",$e="Log1p",Ie="LogicalAnd",ke="LogicalNot",Ee="LogicalOr",Re="LRN",Oe="LRNGrad",Se="Max",Te="Maximum",Ae="MaxPool",Ne="MaxPoolGrad",Fe="MaxPool3D",_e="MaxPool3DGrad",De="MaxPoolWithArgmax",Le="Mean",Pe="Min",Be="Minimum",Me="MirrorPad",je="Mod",Ue="Multinomial",We="Multiply",Ve="Neg",ze="NotEqual",Ge="NonMaxSuppressionV3",He="NonMaxSuppressionV4",Xe="NonMaxSuppressionV5",Ke="OnesLike",qe="OneHot",Ye="Pack",Qe="PadV2",Ze="Pow",Je="Prelu",et="Prod",tt="Range",nt="Real",rt="Reciprocal",ot="Relu",at="Reshape",st="ResizeNearestNeighbor",it="ResizeNearestNeighborGrad",ut="ResizeBilinear",ct="ResizeBilinearGrad",lt="Relu6",dt="Reverse",ht="Round",pt="Rsqrt",ft="ScatterNd",gt="Select",mt="Selu",bt="Slice",xt="Sin",yt="Sinh",vt="Sign",wt="Sigmoid",Ct="Softplus",$t="Sqrt",It="Sum",kt="SpaceToBatchND",Et="SplitV",Rt="Softmax",Ot="SparseFillEmptyRows",St="SparseReshape",Tt="SparseToDense",At="SquaredDifference",Nt="Square",Ft="StridedSlice",_t="Sub",Dt="Tan",Lt="Tanh",Pt="Tile",Bt="TopK",Mt="Transform",jt="Transpose",Ut="Unique",Wt="Unpack",Vt="UnsortedSegmentSum",zt="ZerosLike",Gt="Step",Ht="FromPixels",Xt="RotateWithOffset",Kt="_FusedMatMul",qt="FusedConv2D",Yt="FusedDepthwiseConv2D"},4:function(e,t,n){"use strict";n.r(t),n.d(t,"createScalarValue",(function(){return a})),n.d(t,"toTypedArray",(function(){return s})),n.d(t,"now",(function(){return i})),n.d(t,"fetch",(function(){return u})),n.d(t,"encodeString",(function(){return c})),n.d(t,"decodeString",(function(){return l}));var r=n(5),o=n(6);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function a(e,t){return"string"===t?c(e):s([e],t)}function s(e,t){if("string"===t)throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=o.m(e)),Object(r.b)().getBool("DEBUG")&&o.h(e,t),function(e,t){return e instanceof Float32Array&&"float32"===t||e instanceof Int32Array&&"int32"===t||e instanceof Uint8Array&&"bool"===t}(e,t))return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){const t=new Uint8Array(e.length);for(let n=0;n<t.length;++n)0!==Math.round(e[n])&&(t[n]=1);return t}throw new Error("Unknown data type "+t)}function i(){return Object(r.b)().platform.now()}function u(e,t){return Object(r.b)().platform.fetch(e,t)}function c(e,t="utf-8"){return t=t||"utf-8",Object(r.b)().platform.encode(e,t)}function l(e,t="utf-8"){return t=t||"utf-8",Object(r.b)().platform.decode(e,t)}n.d(t,"shuffle",(function(){return o.M})),n.d(t,"shuffleCombo",(function(){return o.N})),n.d(t,"clamp",(function(){return o.i})),n.d(t,"nearestLargerEven",(function(){return o.H})),n.d(t,"sum",(function(){return o.R})),n.d(t,"randUniform",(function(){return o.J})),n.d(t,"distSquared",(function(){return o.l})),n.d(t,"assert",(function(){return o.b})),n.d(t,"assertShapesMatch",(function(){return o.e})),n.d(t,"assertNonNull",(function(){return o.d})),n.d(t,"flatten",(function(){return o.m})),n.d(t,"sizeFromShape",(function(){return o.O})),n.d(t,"isScalarShape",(function(){return o.y})),n.d(t,"arraysEqual",(function(){return o.a})),n.d(t,"isInt",(function(){return o.v})),n.d(t,"tanh",(function(){return o.S})),n.d(t,"sizeToSquarishShape",(function(){return o.P})),n.d(t,"createShuffledIndices",(function(){return o.k})),n.d(t,"rightPad",(function(){return o.L})),n.d(t,"repeatedTry",(function(){return o.K})),n.d(t,"inferFromImplicitShape",(function(){return o.s})),n.d(t,"parseAxisParam",(function(){return o.I})),n.d(t,"squeezeShape",(function(){return o.Q})),n.d(t,"getTypedArrayFromDType",(function(){return o.o})),n.d(t,"getArrayFromDType",(function(){return o.n})),n.d(t,"checkConversionForErrors",(function(){return o.h})),n.d(t,"isValidDtype",(function(){return o.B})),n.d(t,"hasEncodingLoss",(function(){return o.p})),n.d(t,"isTypedArray",(function(){return o.A})),n.d(t,"bytesPerElement",(function(){return o.g})),n.d(t,"bytesFromStringArray",(function(){return o.f})),n.d(t,"isString",(function(){return o.z})),n.d(t,"isBoolean",(function(){return o.t})),n.d(t,"isNumber",(function(){return o.w})),n.d(t,"inferDtype",(function(){return o.r})),n.d(t,"isFunction",(function(){return o.u})),n.d(t,"nearestDivisor",(function(){return o.G})),n.d(t,"computeStrides",(function(){return o.j})),n.d(t,"toNestedArray",(function(){return o.T})),n.d(t,"makeOnesTypedArray",(function(){return o.D})),n.d(t,"makeZerosTypedArray",(function(){return o.F})),n.d(t,"makeZerosNestedTypedArray",(function(){return o.E})),n.d(t,"assertNonNegativeIntegerDimensions",(function(){return o.c})),n.d(t,"locToIndex",(function(){return o.C})),n.d(t,"indexToLoc",(function(){return o.q})),n.d(t,"isPromise",(function(){return o.x}))},5:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return u}));var r=n(6);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class o{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=a,this.populateURLFlags()}setPlatform(e,t){null!=this.platform&&console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`),this.platformName=e,this.platform=t}registerFlag(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},null!=this.urlFlags[e]){const t=this.urlFlags[e];console.warn(`Setting feature override from URL ${e}: ${t}.`),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];const t=this.evaluateFlag(e);if(Object(r.x)(t))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(null==this.flagRegistry[e])throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(null==this.flagRegistry[e])throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(void 0===this.global||void 0===this.global.location||void 0===this.global.location.search)return;const e=this.getQueryParams(this.global.location.search);if("tfjsflags"in e){e.tfjsflags.split(",").forEach(e=>{const[t,n]=e.split(":");this.urlFlags[t]=function(e,t){if("true"===(t=t.toLowerCase())||"false"===t)return"true"===t;if(""+ +t===t)return+t;throw new Error(`Could not parse value flag value ${t} for flag ${e}.`)}(t,n)})}}}function a(e){const t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...n)=>(function(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||"")}(t,n[0],n[1]),n.join("="))),t}function s(){return i}let i=null;function u(e){i=e}},6:function(e,t,n){"use strict";
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function r(e){let t=e.length,n=0,r=0;for(;t>0;)r=Math.random()*t|0,t--,n=e[t],e[t]=e[r],e[r]=n}function o(e,t){if(e.length!==t.length)throw new Error("Array sizes must match to be shuffled together First array length was "+e.length+"Second array length was "+t.length);let n,r,o=e.length,a=0;for(;o>0;)a=Math.random()*o|0,o--,n=e[o],r=t[o],e[o]=e[a],t[o]=t[a],e[a]=n,t[a]=r}function a(e,t,n){return Math.max(e,Math.min(t,n))}function s(e){return e%2==0?e:e+1}function i(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return t}function u(e,t){const n=Math.random();return t*n+(1-n)*e}function c(e,t){let n=0;for(let r=0;r<e.length;r++){const o=Number(e[r])-Number(t[r]);n+=o*o}return n}function l(e,t){if(!e)throw new Error("string"==typeof t?t:t())}function d(e,t,n=""){l(m(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function h(e){l(null!=e,()=>"The input to the tensor constructor must be a non-null value.")}function p(e,t=[],n=!1){if(null==t&&(t=[]),Array.isArray(e)||A(e)&&!n)for(let r=0;r<e.length;++r)p(e[r],t,n);else t.push(e);return t}function f(e){if(0===e.length)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function g(e){return 0===e.length}function m(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function b(e){return e%1==0}function x(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return-1;{const t=Math.exp(2*e);return(t-1)/(t+1)}}function y(e){const t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function v(e){const t=new Uint32Array(e);for(let n=0;n<e;++n)t[n]=n;return r(t),t}function w(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function C(e,t=(e=>0),n){return new Promise((r,o)=>{let a=0;const s=()=>{if(e())return void r();a++;const i=t(a);null!=n&&a>=n?o():setTimeout(s,i)};s()})}function $(e,t){let n=1,r=-1;for(let t=0;t<e.length;++t)if(e[t]>=0)n*=e[t];else if(-1===e[t]){if(-1!==r)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${t}`);r=t}else if(e[t]<0)throw Error(`Shapes can not be < 0. Found ${e[t]} at dim ${t}`);if(-1===r){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(0===n)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!=0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);const o=e.slice();return o[r]=t/n,o}function I(e,t){const n=t.length;return l((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis `+e),l(e.every(e=>b(e)),()=>"All values in axis param must be integers but got axis "+e),e.map(e=>e<0?n+e:e)}function k(e,t){const n=[],r=[],o=null!=t&&Array.isArray(t)&&0===t.length,a=null==t||o?null:I(t,e).sort();let s=0;for(let t=0;t<e.length;++t){if(null!=a){if(a[s]===t&&1!==e[t])throw new Error(`Can't squeeze axis ${t} since its dim '${e[t]}' is not 1`);(null==a[s]||a[s]>t)&&1===e[t]&&(n.push(e[t]),r.push(t)),a[s]<=t&&s++}1!==e[t]&&(n.push(e[t]),r.push(t))}return{newShape:n,keptDims:r}}function E(e,t){let n=null;if(null==e||"float32"===e)n=new Float32Array(t);else if("int32"===e)n=new Int32Array(t);else{if("bool"!==e)throw new Error("Unknown data type "+e);n=new Uint8Array(t)}return n}function R(e,t){let n=null;if(null==e||"float32"===e)n=new Float32Array(t);else if("int32"===e)n=new Int32Array(t);else if("bool"===e)n=new Uint8Array(t);else{if("string"!==e)throw new Error("Unknown data type "+e);n=new Array(t)}return n}function O(e,t){for(let n=0;n<e.length;n++){const r=e[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function S(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function T(e,t){return"complex64"!==t&&(("float32"!==t||"complex64"===e)&&(("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)))}function A(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array}function N(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw new Error("Unknown dtype "+e)}function F(e){if(null==e)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function _(e){return"string"==typeof e||e instanceof String}function D(e){return"boolean"==typeof e}function L(e){return"number"==typeof e}function P(e){return Array.isArray(e)?P(e[0]):e instanceof Float32Array?"float32":e instanceof Int32Array||e instanceof Uint8Array?"int32":L(e)?"float32":_(e)?"string":D(e)?"bool":"float32"}function B(e){return!!(e&&e.constructor&&e.call&&e.apply)}function M(e,t){for(let n=t;n<e;++n)if(e%n==0)return n;return e}function j(e){const t=e.length;if(t<2)return[];const n=new Array(t-1);n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}function U(e,t,n=!1){if(0===e.length)return t[0];const r=e.reduce((e,t)=>e*t)*(n?2:1);if(0===r)return[];if(r!==t.length)throw new Error(`[${e}] does not match the input size ${t.length}${n?" for a complex tensor":""}.`);return function e(t,n,r,o=!1){const a=new Array;if(1===n.length){const e=n[0]*(o?2:1);for(let n=0;n<e;n++)a[n]=r[t+n]}else{const s=n[0],i=n.slice(1),u=i.reduce((e,t)=>e*t)*(o?2:1);for(let n=0;n<s;n++)a[n]=e(t+n*u,i,r,o)}return a}(0,e,t,n)}function W(e,t){const n=V(e,t);for(let e=0;e<n.length;e++)n[e]=1;return n}function V(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw new Error("Unknown data type "+t)}function z(e,t){const n=e.reduce((e,t)=>e*t,1);if(null==t||"float32"===t)return U(e,new Float32Array(n));if("int32"===t)return U(e,new Int32Array(n));if("bool"===t)return U(e,new Uint8Array(n));throw new Error("Unknown data type "+t)}function G(e){e.forEach(t=>{l(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function H(e,t,n){if(0===t)return 0;if(1===t)return e[0];let r=e[e.length-1];for(let t=0;t<e.length-1;++t)r+=n[t]*e[t];return r}function X(e,t,n){if(0===t)return[];if(1===t)return[e];const r=new Array(t);for(let t=0;t<r.length-1;++t)r[t]=Math.floor(e/n[t]),e-=r[t]*n[t];return r[r.length-1]=e,r}function K(e){return e&&e.then&&"function"==typeof e.then}n.d(t,"M",(function(){return r})),n.d(t,"N",(function(){return o})),n.d(t,"i",(function(){return a})),n.d(t,"H",(function(){return s})),n.d(t,"R",(function(){return i})),n.d(t,"J",(function(){return u})),n.d(t,"l",(function(){return c})),n.d(t,"b",(function(){return l})),n.d(t,"e",(function(){return d})),n.d(t,"d",(function(){return h})),n.d(t,"m",(function(){return p})),n.d(t,"O",(function(){return f})),n.d(t,"y",(function(){return g})),n.d(t,"a",(function(){return m})),n.d(t,"v",(function(){return b})),n.d(t,"S",(function(){return x})),n.d(t,"P",(function(){return y})),n.d(t,"k",(function(){return v})),n.d(t,"L",(function(){return w})),n.d(t,"K",(function(){return C})),n.d(t,"s",(function(){return $})),n.d(t,"I",(function(){return I})),n.d(t,"Q",(function(){return k})),n.d(t,"o",(function(){return E})),n.d(t,"n",(function(){return R})),n.d(t,"h",(function(){return O})),n.d(t,"B",(function(){return S})),n.d(t,"p",(function(){return T})),n.d(t,"A",(function(){return A})),n.d(t,"g",(function(){return N})),n.d(t,"f",(function(){return F})),n.d(t,"z",(function(){return _})),n.d(t,"t",(function(){return D})),n.d(t,"w",(function(){return L})),n.d(t,"r",(function(){return P})),n.d(t,"u",(function(){return B})),n.d(t,"G",(function(){return M})),n.d(t,"j",(function(){return j})),n.d(t,"T",(function(){return U})),n.d(t,"D",(function(){return W})),n.d(t,"F",(function(){return V})),n.d(t,"E",(function(){return z})),n.d(t,"c",(function(){return G})),n.d(t,"C",(function(){return H})),n.d(t,"q",(function(){return X})),n.d(t,"x",(function(){return K}))},7:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return s}));var r=n(8),o=n(12);n(6);
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function a(e,t){if(e.dtype===t.dtype)return[e,t];const n=Object(o.b)(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function s(e){const t=[];return function e(t,n,o){if(null==t)return;if(t instanceof r.a)return void n.push(t);if(a=t,!Array.isArray(a)&&"object"!=typeof a)return;var a;const s=t;for(const t in s){const r=s[t];o.has(r)||(o.add(r),e(r,n,o))}}(e,t,new Set),t}},8:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"f",(function(){return f})),n.d(t,"e",(function(){return g})),n.d(t,"d",(function(){return m})),n.d(t,"a",(function(){return b})),n.d(t,"c",(function(){return x}));var r=n(15),o=n(6);function a(e,t,n,r){const a=Object(o.j)(t),c=function(e,t,n,r){const a=Object(o.O)(t),i=r[r.length-1],c=new Array(i).fill(0),l=t.length,d="complex64"===n?u(e):e;if(l>1)for(let e=0;e<a/i;e++){const t=e*i;for(let e=0;e<i;e++)c[e]=Math.max(c[e],s(d[t+e],0,n).length)}return c}(e,t,n,a),l=t.length,d=function e(t,n,r,o,a,c=!0){const l="complex64"===r?2:1,d=n[0],h=n.length;if(0===h){if("complex64"===r){return[s(u(t)[0],0,r)]}return"bool"===r?[i(t[0])]:[t[0].toString()]}if(1===h){if(d>20){const e=3*l;let n=Array.from(t.slice(0,e)),o=Array.from(t.slice((d-3)*l,d*l));return"complex64"===r&&(n=u(n),o=u(o)),["["+n.map((e,t)=>s(e,a[t],r)).join(", ")+", ..., "+o.map((e,t)=>s(e,a[d-3+t],r)).join(", ")+"]"]}return["["+("complex64"===r?u(t):Array.from(t)).map((e,t)=>s(e,a[t],r)).join(", ")+"]"]}const p=n.slice(1),f=o.slice(1),g=o[0]*l,m=[];if(d>20){for(let n=0;n<3;n++){const o=n*g,s=o+g;m.push(...e(t.slice(o,s),p,r,f,a,!1))}m.push("...");for(let n=d-3;n<d;n++){const o=n*g,s=o+g;m.push(...e(t.slice(o,s),p,r,f,a,n===d-1))}}else for(let n=0;n<d;n++){const o=n*g,s=o+g;m.push(...e(t.slice(o,s),p,r,f,a,n===d-1))}const b=2===h?",":"";m[0]="["+m[0]+b;for(let e=1;e<m.length-1;e++)m[e]=" "+m[e]+b;let x=",\n";for(let e=2;e<h;e++)x+="\n";return m[m.length-1]=" "+m[m.length-1]+"]"+(c?"":x),m}(e,t,n,a,c),h=["Tensor"];return r&&(h.push("  dtype: "+n),h.push("  rank: "+l),h.push(`  shape: [${t}]`),h.push("  values:")),h.push(d.map(e=>"    "+e).join("\n")),h.join("\n")}function s(e,t,n){let r;return r=Array.isArray(e)?parseFloat(e[0].toFixed(7))+" + "+parseFloat(e[1].toFixed(7))+"j":Object(o.z)(e)?`'${e}'`:"bool"===n?i(e):parseFloat(e.toFixed(7)).toString(),Object(o.L)(r,t)}function i(e){return 0===e?"false":"true"}function u(e){const t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}var c=n(4);
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class l{constructor(e,t,n){if(this.dtype=t,this.shape=e.slice(),this.size=o.O(e),null!=n){const e=n.length;o.b(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if("complex64"===t)throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||o.n(t,this.size),this.strides=Object(o.j)(e)}set(e,...t){0===t.length&&(t=[0]),o.b(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);const n=this.locToIndex(t);this.values[n]=e}get(...e){0===e.length&&(e=[0]);let t=0;for(const n of e){if(n<0||n>=this.shape[t]){const t=`Requested out of range element at ${e}.   Buffer shape=`+this.shape;throw new Error(t)}t++}let n=e[e.length-1];for(let t=0;t<e.length-1;++t)n+=this.strides[t]*e[t];return this.values[n]}locToIndex(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];let t=e[e.length-1];for(let n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t}indexToLoc(e){if(0===this.rank)return[];if(1===this.rank)return[e];const t=new Array(this.shape.length);for(let n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return d().makeTensor(this.values,this.shape,this.dtype)}}let d=null,h=null,p=null;function f(e){d=e}function g(e){h=e}function m(e){p=e}class b{constructor(e,t,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=o.O(e),this.strides=Object(o.j)(e),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){const e=await this.data();return h.buffer(this.shape,this.dtype,e)}bufferSync(){return h.buffer(this.shape,this.dtype,this.dataSync())}async array(){const e=await this.data();return Object(o.T)(this.shape,e,"complex64"===this.dtype)}arraySync(){return Object(o.T)(this.shape,this.dataSync(),"complex64"===this.dtype)}async data(){this.throwIfDisposed();const e=d().read(this.dataId);if("string"===this.dtype){const t=await e;try{return t.map(e=>c.decodeString(e))}catch(e){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataSync(){this.throwIfDisposed();const e=d().readSync(this.dataId);if("string"===this.dtype)try{return e.map(e=>c.decodeString(e))}catch(e){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();const e=await d().read(this.dataId);return"string"===this.dtype?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(d().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return h.print(this,e)}clone(){return this.throwIfDisposed(),h.clone(this)}toString(e=!1){return a(this.dataSync(),this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),h.cast(this,e)}variable(e=!0,t,n){return this.throwIfDisposed(),d().makeVariable(this,e,t,n)}}Object.defineProperty(b,Symbol.hasInstance,{value:e=>!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}),Object(r.a)("Tensor",()=>b);class x extends b{constructor(e,t,n,r){super(e.shape,e.dtype,e.dataId,r),this.trainable=t,this.name=n}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!o.a(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);d().disposeTensor(this),this.dataId=e.dataId,d().incRef(this,null)}dispose(){d().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(x,Symbol.hasInstance,{value:e=>e instanceof b&&null!=e.assign&&e.assign instanceof Function})},9:function(e,t,n){"use strict";(function(e){n.d(t,"e",(function(){return i})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return d})),n.d(t,"d",(function(){return h})),n.d(t,"c",(function(){return p})),n.d(t,"f",(function(){return f}));var r=n(10),o=n(13),a=n(6),s=n(18);function i(e,t){const n={};let i,u=0;for(const c of t){const t=c.name,l=c.dtype,d=c.shape,h=Object(a.O)(d);let p;if("quantization"in c){const n=c.quantization;if("uint8"===n.dtype||"uint16"===n.dtype){if(!("min"in n)||!("scale"in n))throw new Error(`Weight ${c.name} with quantization ${n.dtype} doesn't have corresponding metadata min and scale.`)}else{if("float16"!==n.dtype)throw new Error(`Weight ${c.name} has unknown quantization dtype ${n.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);if("float32"!==l)throw new Error(`Weight ${c.name} is quantized with ${n.dtype} which only supports weights of type float32 not ${l}.`)}const r=s.a[n.dtype],o=e.slice(u,u+h*r),a="uint8"===n.dtype?new Uint8Array(o):new Uint16Array(o);if("float32"===l)if("uint8"===n.dtype||"uint16"===n.dtype){p=new Float32Array(a.length);for(let e=0;e<a.length;e++){const t=a[e];p[e]=t*n.scale+n.min}}else{if("float16"!==n.dtype)throw new Error(`Unsupported quantization type ${n.dtype} for weight type float32.`);void 0===i&&(i=g()),p=i(a)}else{if("int32"!==l)throw new Error(`Unsupported dtype in weight '${t}': ${l}`);if("uint8"!==n.dtype&&"uint16"!==n.dtype)throw new Error(`Unsupported quantization type ${n.dtype} for weight type int32.`);p=new Int32Array(a.length);for(let e=0;e<a.length;e++){const t=a[e];p[e]=Math.round(t*n.scale+n.min)}}u+=h*r}else if("string"===l){const t=Object(a.O)(c.shape);p=[];for(let n=0;n<t;n++){const t=new Uint32Array(e.slice(u,u+4))[0];u+=4;const n=new Uint8Array(e.slice(u,u+t));p.push(n),u+=t}}else{const a=s.a[l],i=e.slice(u,u+h*a);if("float32"===l)p=new Float32Array(i);else if("int32"===l)p=new Int32Array(i);else if("bool"===l)p=new Uint8Array(i);else{if("complex64"!==l)throw new Error(`Unsupported dtype in weight '${t}': ${l}`);{p=new Float32Array(i);const e=new Float32Array(p.length/2),a=new Float32Array(p.length/2);for(let t=0;t<e.length;t++)e[t]=p[2*t],a[t]=p[2*t+1];const s=Object(o.a)(e,d,"float32"),u=Object(o.a)(a,d,"float32");n[t]=Object(r.a)(s,u),s.dispose(),u.dispose()}}u+=h*a}"complex64"!==l&&(n[t]=Object(o.a)(p,d,l))}return n}const u=void 0!==e&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function c(t){return u?e.byteLength(t):new Blob([t]).size}function l(t){if(u)return e.from(t).toString("base64");const n=new Uint8Array(t);let r="";for(let e=0,t=n.length;e<t;e++)r+=String.fromCharCode(n[e]);return btoa(r)}function d(t){if(u){const n=e.from(t,"base64");return n.buffer.slice(n.byteOffset,n.byteOffset+n.byteLength)}const n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;++e)r.set([n.charCodeAt(e)],e);return r.buffer}function h(e){if(1===e.length)return e[0];let t=0;e.forEach(e=>{t+=e.byteLength});const n=new Uint8Array(t);let r=0;return e.forEach(e=>{n.set(new Uint8Array(e),r),r+=e.byteLength}),n.buffer}function p(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);const t=e.split("/");return t[t.length-1]}function f(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:c(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:c(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:e.weightData.byteLength}}function g(){const e=function(){const e=e=>{let t=e<<13,n=0;for(;0==(8388608&t);)n-=8388608,t<<=1;return t&=-8388609,n+=947912704,t|n},t=new Uint32Array(2048);t[0]=0;for(let n=1;n<1024;n++)t[n]=e(n);for(let e=1024;e<2048;e++)t[e]=939524096+(e-1024<<13);return t}(),t=function(){const e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}(),n=function(){const e=new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}();return r=>{const o=new ArrayBuffer(4*r.length),a=new Uint32Array(o);for(let o=0;o<r.length;o++){const s=r[o],i=e[n[s>>10]+(1023&s)]+t[s>>10];a[o]=i}return new Float32Array(o)}}}).call(this,n(158).Buffer)}});