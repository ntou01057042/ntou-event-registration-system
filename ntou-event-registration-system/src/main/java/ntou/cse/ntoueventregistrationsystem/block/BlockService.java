package ntou.cse.ntoueventregistrationsystem.block;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlockService {

    private final BlockRepository repository;

    @Autowired
    public BlockService(BlockRepository repository) {
        this.repository = repository;
    }

    public Boolean createBlock(Block block) {
        if (repository.existsByUserIdAndTargetId(block.getUserId(), block.getTargetId())) {
            return false;
        } else {
            repository.save(block);
            return true;
        }
    }
    public Boolean deleteBlock(Block block) {
        if (repository.existsByUserIdAndTargetId(block.getUserId(),block.getTargetId())) {
            repository.delete(block);
            return true;
        } else {
            return false;
        }
    }
}
