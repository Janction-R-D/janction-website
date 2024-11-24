import JanctionMarkdown from '@/components/JanctionMarkdown';
import markdownContent from './Janction-help.md';

const Help = (props) => {
  return (
    <div className="markdown-body">
      <JanctionMarkdown>{markdownContent}</JanctionMarkdown>
    </div>
  );
};

export default Help;
