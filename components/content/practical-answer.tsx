import { AnswerBox } from '@/components/content/answer-box';
import { StepList } from '@/components/content/step-list';
import { strings } from '@/lib/strings/en';
export function PracticalAnswer({ answer, checklist }: { answer: string; checklist: { title: string; body: string }[] }) {
  return <><AnswerBox text={answer} /><StepList steps={checklist} heading={strings.content.setup} /></>;
}
