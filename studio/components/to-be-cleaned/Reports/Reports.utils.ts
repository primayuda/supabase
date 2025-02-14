import { useProjectContentStore } from 'stores/projectContentStore'
import { NEW_REPORT_SKELETON } from './Reports.constants'
import toast from 'react-hot-toast'

function handleErr(error: any) {
  console.error(error)
  toast.error(error.message)
}

/*
 * createReport()
 *
 * Creates a new report with a basic skeleton
 * also pushes route to new report
 *
 * returns :object
 */
export const createReport = async ({ router }: any) => {
  const { ref } = router.query
  try {
    const contentStore = useProjectContentStore(ref)
    const { data: newReport, error } = await contentStore.create(NEW_REPORT_SKELETON)
    if (error) throw error
    await contentStore.load()
    router.push(`/project/${ref}/reports/${newReport[0].id}`)
  } catch (err) {
    handleErr(err)
  }
}

/*
 * deleteReport()
 *
 * Deletes a new report with a basic skeleton
 * also pushes route another report in list
 *
 * returns :object
 */
export const deleteReport = async ({ router, id }: any) => {
  const { ref } = router.query
  const contentStore = useProjectContentStore(ref)
  try {
    const { data: delReport, error } = await contentStore.del(id)
    if (error) throw error
    await contentStore.load()
    // push route to report index
    router.push(`/project/${ref}/reports`)
    return delReport
  } catch (err) {
    handleErr(err)
  }
}
