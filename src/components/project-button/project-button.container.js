/*
 * Copyright 2018 Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { connect } from 'react-redux';
import ProjectButton from './project-button.component';
import { projects } from '../../constants';

const getLink = (path, project) => {
  if (path.includes(project)) return path;
  return path.replace(Object.keys(projects).find(p => projects[p].key !== project), project);
};

const mapStateToProps = (state, props) => ({
  active: state.router.location.pathname.includes(`/${props.project.key}`),
  link: getLink(state.router.location.pathname, props.project.key),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectButton);
