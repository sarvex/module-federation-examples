import * as path from 'path';
import { ExecutorContext } from '@nrwl/devkit';
import { NFPServeExecutorOptions } from './schema';
import serveExecutor from '@nrwl/web/src/executors/file-server/file-server.impl';

async function fetchProjectBuildVersion(endpoint: string) {
  // try {
  //   const response = await window.fetch(endpoint, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     }
  //   });

  //   if (!response.ok) {
  //     throw response;
  //   }

  //   return await response.json();
  // } catch (e) {
  //   return Promise.reject(e);
  // }

  return '6112a88d66489d47a1e4bb3eac18c60d850487b36cb2ff2cbee9ad5501490f2f';
}

/**
 *
 */
function updateProjectBuildOutputPath(context: ExecutorContext, version: string) {
  const projectBuildTarget = context.workspace.projects[context.projectName].targets.build; 
  projectBuildTarget.options.outputPath = path.join(projectBuildTarget.options.outputPath, `version-${version}`);
}

/**
 *
 */
export default async function runExecutor(
  options: NFPServeExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { root, projectName, configurationName } = context;

  options.host = options.host || 'localhost';

  if (configurationName === 'version') {
    const buildVersion = await fetchProjectBuildVersion('');
    updateProjectBuildOutputPath(context, buildVersion);
  }

  for await (const execution of serveExecutor(options, context as never)) {
    if (!execution.success) {
      throw new Error(`Nx Native Federation: Starting server failed`);
    }
  }

  return { success: true };
}