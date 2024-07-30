import styles from './index.module.css'
import { isIgnoreCaseAtom, isShowAnswerOnHoverAtom, isShowPrevAndNextWordAtom, isTextSelectableAtom, randomConfigAtom } from '@/store'
import { Switch } from '@headlessui/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

export default function AdvancedSetting() {
  const [randomConfig, setRandomConfig] = useAtom(randomConfigAtom)
  const [isShowPrevAndNextWord, setIsShowPrevAndNextWord] = useAtom(isShowPrevAndNextWordAtom)
  const [isIgnoreCase, setIsIgnoreCase] = useAtom(isIgnoreCaseAtom)
  const [isTextSelectable, setIsTextSelectable] = useAtom(isTextSelectableAtom)
  const [isShowAnswerOnHover, setIsShowAnswerOnHover] = useAtom(isShowAnswerOnHoverAtom)

  const onToggleRandom = useCallback(
    (checked: boolean) => {
      setRandomConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setRandomConfig],
  )

  const onToggleLastAndNextWord = useCallback(
    (checked: boolean) => {
      setIsShowPrevAndNextWord(checked)
    },
    [setIsShowPrevAndNextWord],
  )

  const onToggleIgnoreCase = useCallback(
    (checked: boolean) => {
      setIsIgnoreCase(checked)
    },
    [setIsIgnoreCase],
  )

  const onToggleTextSelectable = useCallback(
    (checked: boolean) => {
      setIsTextSelectable(checked)
    },
    [setIsTextSelectable],
  )
  const onToggleShowAnswerOnHover = useCallback(
    (checked: boolean) => {
      setIsShowAnswerOnHover(checked)
    },
    [setIsShowAnswerOnHover],
  )

  return (
    <ScrollArea.Root className="flex-1 select-none overflow-y-auto ">
      <ScrollArea.Viewport className="h-full w-full px-3">
        <div className={styles.tabContent}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>무짝위 순서</span>
            <span className={styles.sectionDescription}>단어가 나타나는 순서를 무짝위로 섞습니다. 변경 후 다음 연습부터 적용됩니다.</span>
            <div className={styles.switchBlock}>
              <Switch checked={randomConfig.isOpen} onChange={onToggleRandom} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{randomConfig.isOpen ? '켬' : '끔'}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>지난 / 다음 단어 미리보기</span>
            <span className={styles.sectionDescription}>연습 중 지난 / 다음 단어를 표시합니다.</span>
            <div className={styles.switchBlock}>
              <Switch checked={isShowPrevAndNextWord} onChange={onToggleLastAndNextWord} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{isShowPrevAndNextWord ? '켬' : '끔'}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>대소문자 무시</span>
            <span className={styles.sectionDescription}>활성화할 경우 Hello 및 hello 모두 맞힌 것으로 간주합니다.</span>
            <div className={styles.switchBlock}>
              <Switch checked={isIgnoreCase} onChange={onToggleIgnoreCase} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{isIgnoreCase ? '켬' : '끔'}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>텍스트 선택 허용</span>
            <span className={styles.sectionDescription}>활성화할 경우 마우스로 단어를 드래그해서 선택할 수 있습니다.</span>
            <div className={styles.switchBlock}>
              <Switch checked={isTextSelectable} onChange={onToggleTextSelectable} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{isTextSelectable ? '켬' : '끔'}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>암기 모드 중 힌트 표시</span>
            <span className={styles.sectionDescription}>활성화할 경우, 마우스로 허버해서 정답을 확인할 수 있습니다. </span>
            <div className={styles.switchBlock}>
              <Switch checked={isShowAnswerOnHover} onChange={onToggleShowAnswerOnHover} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{isShowAnswerOnHover ? '켬' : '끔'}</span>
            </div>
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
